/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { dateI18n, getDate, humanTimeDiff, getSettings } from '@wordpress/date';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { getBlockTypes } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { getRevisionChanges } from './get-revision-changes';

const DAY_IN_MILLISECONDS = 60 * 60 * 1000 * 24;

function ChangedSummary( { revision, previousRevision } ) {
	const blockNames = useMemo( () => {
		const blockTypes = getBlockTypes();
		return blockTypes.reduce( ( accumulator, { name, title } ) => {
			accumulator[ name ] = title;
			return accumulator;
		}, {} );
	}, [] );
	const summary = getRevisionChanges(
		revision,
		previousRevision,
		blockNames
	);

	if ( ! summary ) {
		return null;
	}

	return (
		<span className="edit-site-global-styles-screen-revision__changes">
			{ summary }
		</span>
	);
}

/**
 * Returns a button label for the revision.
 *
 * @param {string|number} id                    A revision object.
 * @param {boolean}       isLatest              Whether the revision is the most current.
 * @param {string}        authorDisplayName     Author name.
 * @param {string}        formattedModifiedDate Revision modified date formatted.
 * @return {string} Translated label.
 */
function getRevisionLabel(
	id,
	isLatest,
	authorDisplayName,
	formattedModifiedDate
) {
	if ( 'parent' === id ) {
		return __( 'Reset the styles to the theme defaults' );
	}

	if ( 'unsaved' === id ) {
		return sprintf(
			/* translators: %s author display name */
			__( 'Unsaved changes by %s' ),
			authorDisplayName
		);
	}

	return isLatest
		? sprintf(
				/* translators: %1$s author display name, %2$s: revision creation date */
				__( 'Changes saved by %1$s on %2$s (current)' ),
				authorDisplayName,
				formattedModifiedDate
		  )
		: sprintf(
				/* translators: %1$s author display name, %2$s: revision creation date */
				__( 'Changes saved by %1$s on %2$s' ),
				authorDisplayName,
				formattedModifiedDate
		  );
}

/**
 * Returns a rendered list of revisions buttons.
 *
 * @typedef {Object} props
 * @property {Array<Object>} userRevisions      A collection of user revisions.
 * @property {number}        selectedRevisionId The id of the currently-selected revision.
 * @property {Function}      onChange           Callback fired when a revision is selected.
 *
 * @param    {props}         Component          props.
 * @return {JSX.Element} The modal component.
 */
function RevisionsButtons( {
	userRevisions,
	selectedRevisionId,
	onChange,
	onSelect,
	canApplyRevision,
} ) {
	const { currentThemeName, currentUser } = useSelect( ( select ) => {
		const { getCurrentTheme, getCurrentUser } = select( coreStore );
		const currentTheme = getCurrentTheme();
		return {
			currentThemeName:
				currentTheme?.name?.rendered || currentTheme?.stylesheet,
			currentUser: getCurrentUser(),
		};
	}, [] );
	const dateNowInMs = getDate().getTime();
	const { datetimeAbbreviated } = getSettings().formats;

	return (
		<ol
			className="edit-site-global-styles-screen-revisions__revisions-list"
			aria-label={ __( 'Global styles revisions' ) }
			role="group"
		>
			{ userRevisions.map( ( revision, index ) => {
				const { id, isLatest, author, modified } = revision;
				const isUnsaved = 'unsaved' === id;
				// Unsaved changes are created by the current user.
				const revisionAuthor = isUnsaved ? currentUser : author;
				const authorDisplayName = revisionAuthor?.name || __( 'User' );
				const authorAvatar = revisionAuthor?.avatar_urls?.[ '48' ];
				const isFirstItem = index === 0;
				const isSelected = selectedRevisionId
					? selectedRevisionId === id
					: isFirstItem;
				const isReset = 'parent' === id;
				const modifiedDate = getDate( modified );
				const displayDate =
					modified &&
					dateNowInMs - modifiedDate.getTime() > DAY_IN_MILLISECONDS
						? dateI18n( datetimeAbbreviated, modifiedDate )
						: humanTimeDiff( modified );
				const revisionLabel = getRevisionLabel(
					id,
					isLatest,
					authorDisplayName,
					dateI18n( datetimeAbbreviated, modifiedDate )
				);

				return (
					<li
						className={ classnames(
							'edit-site-global-styles-screen-revisions__revision-item',
							{
								'is-selected': isSelected,
								'is-reset': isReset,
							}
						) }
						key={ id }
					>
						<Button
							className="edit-site-global-styles-screen-revisions__revision-button"
							disabled={ isSelected }
							onClick={ () => {
								onChange( revision );
							} }
							label={ revisionLabel }
						>
							{ isReset ? (
								<span className="edit-site-global-styles-screen-revisions__description">
									{ __( 'Default styles' ) }
									<span className="edit-site-global-styles-screen-revisions__meta">
										{ currentThemeName }
									</span>
								</span>
							) : (
								<span className="edit-site-global-styles-screen-revisions__description">
									{ isUnsaved ? (
										<span className="edit-site-global-styles-screen-revisions__date">
											{ __( '(Unsaved)' ) }
										</span>
									) : (
										<time
											className="edit-site-global-styles-screen-revisions__date"
											dateTime={ modified }
										>
											{ displayDate }
										</time>
									) }
									<span className="edit-site-global-styles-screen-revisions__meta">
										<img
											alt={ authorDisplayName }
											src={ authorAvatar }
										/>
										{ authorDisplayName }
									</span>
								</span>
							) }
						</Button>
						{ isSelected && (
							<>
								<ChangedSummary
									revision={ revision }
									previousRevision={
										index < userRevisions.length
											? userRevisions[ index + 1 ]
											: {}
									}
								/>
								{ /* eslint-disable-next-line no-nested-ternary */ }
								{ canApplyRevision ? (
									<Button
										variant="secondary"
										className="edit-site-global-styles-screen-revision__button"
										onClick={ onSelect }
									>
										{ isReset
											? __( 'Reset to defaults' )
											: __( 'Apply' ) }
									</Button>
								) : (
									<span className="edit-site-global-styles-screen-revision__matches">
										{ __(
											'Revision matches current editor styles.'
										) }
									</span>
								) }
							</>
						) }
					</li>
				);
			} ) }
		</ol>
	);
}

export default RevisionsButtons;
