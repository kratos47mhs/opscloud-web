export function getStatusTagType (value) {
  switch (value) {
    case 0:
      return 'primary'
    case 1:
      return 'success'
    case 2:
      return 'warning'
    case 3:
      return 'info'
    default:
      return 'danger'
  }
}

export function getStatusTagText (value) {
  switch (value) {
    case 0:
      return 'New'
    case 1:
      return '已录入'
    case 2:
      return '标记删除'
    case 3:
      return '删除'
    default:
      return 'Undefined'
  }
}

/**
 * Server login type
 * @param value
 * @returns {string}
 */
export function getLoginTypeText (value) {
  switch (value) {
    case 0:
      return 'Key'
    case 1:
      return 'Password'
    default:
      return 'Undefined'
  }
}

export function getMonitorStatusText (value) {
  switch (value) {
    case -1:
      return 'Not monitored'
    case 0:
      return 'Enable'
    case 1:
      return 'Disable'
    default:
      return 'Undefined'
  }
}

export function getMonitorStatusType (value) {
  switch (value) {
    case -1:
      return 'info'
    case 0:
      return 'success'
    case 1:
      return 'warning'
    default:
      return 'danger'
  }
}

export function getServerTypeText (value) {
  switch (value) {
    case 0:
      return 'server'
    case 1:
      return 'vmware vm'
    case 2:
      return 'aliyun ecs'
    case 3:
      return 'aws ec2'
    case 4:
      return 'tencent cvm'
    case 5:
      return 'vmware esxi'
    case 6:
      return 'zabbix host'
    default:
      return 'Undefined'
  }
}

/**
 * Return the converted memory unit GiB
 * @param value
 * @returns {string}
 */
export function getMemoryText (value) {
  // const memory = value / 1024
  return value / 1024
}

export function getServerStatusType (value) {
  switch (value) {
    case 0:
      return 'info'
    case 1:
      return 'success'
    case -1:
      return 'warning'
    default:
      return 'danger'
  }
}

export function getServerStatusText (value) {
  switch (value) {
    case 0:
      return 'Offline'
    case 1:
      return 'Online'
    case -1:
      return 'Uncertain'
    default:
      return 'Undefined'
  }
}

// Payment type
export function getChargeTypeText (value) {
  switch (value) {
    case 'PrePaid':
      return 'Yearly and monthly'
    case 'PostPaid':
      return 'Pay-as-you-go'
    default:
      return 'Undefined'
  }
}

export function getChargeType (value) {
  switch (value) {
    case 'PrePaid':
      return 'success'
    case 'PostPaid':
      return 'warning'
    default:
      return 'info'
  }
}

export function getRenewalStatus (value) {
  switch (value) {
    case 'AutoRenewal':
      return 'success'
    case 'Normal':
      return 'warning'
    case 'NotRenewal':
      return 'danger'
    default:
      return 'info'
  }
}

export function getRenewalStatusText (value) {
  switch (value) {
    case 'AutoRenewal':
      return 'Auto Renewal'
    case 'Normal':
      return 'Manual Renewal'
    case 'NotRenewal':
      return 'No longer Renew'
    default:
      return 'Undefined'
  }
}
