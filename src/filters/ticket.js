export function getPhaseText (value) {
  switch (value) {
    case 'CREATED_TICKET':
      return 'New'
    case 'APPLIED_TICKET':
      return 'Submit Application'
    case 'ORG_APPROVAL':
      return 'Superior Approval'
    case 'USERGROUP_APPROVAL':
      return 'User group approval'
    case 'CONFIGURATION':
      return 'Operation and maintenance configuration stage'
    case 'FINALIZED':
      return 'Finalized'
    default:
      return 'Undefined'
  }
}

export function getPhaseType (value) {
  switch (value) {
    case 'CREATED_TICKET':
      return ''
    case 'APPLIED_TICKET':
      return 'warning'
    case 'ORG_APPROVAL':
      return 'danger'
    case 'USERGROUP_APPROVAL':
      return 'danger'
    case 'CONFIGURATION':
      return 'danger'
    case 'FINALIZED':
      return 'success'
    default:
      return 'danger'
  }
}
