function text(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function normalizeMobile(value) {
  return text(value).replace(/\D/g, '').slice(-10)
}

function getSourceKey(branch) {
  const normalized = text(branch)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  const branchToSourceKey = {
    kurla: 'kurla_website',
    kandivali: 'kandivali_website',
    vikhroli: 'vikhroli_website',
    marol: 'marol_website',
    'asalfa-ladies': 'asalfa_ladies_website',
    'asalfa-unisex': 'asalfa_unisex_website',
    vfour9: 'thane_v49_website',
    v49: 'thane_v49_website',
    thane: 'thane_v49_website',
  }

  return branchToSourceKey[normalized] || null
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed.',
    })
  }

  const crmUrl = process.env.CRM_LEAD_API_URL
  const crmSecret = process.env.CRM_LEAD_WEBHOOK_SECRET

  if (!crmUrl || !crmSecret) {
    console.error('CRM lead environment variables are missing.')

    return res.status(500).json({
      success: false,
      message: 'CRM connection is not configured.',
    })
  }

  const name = text(req.body?.name)
  const mobile = normalizeMobile(
    req.body?.mobile || req.body?.phone
  )
  const sourceKey = getSourceKey(req.body?.branch)

  if (!name || mobile.length !== 10 || !sourceKey) {
    return res.status(400).json({
      success: false,
      message:
        'Name, valid mobile number, and a valid branch are required.',
    })
  }

  try {
    const crmResponse = await fetch(crmUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-lead-secret': crmSecret,
      },
      body: JSON.stringify({
        source_key: sourceKey,
        name,
        mobile,
      }),
    })

    const crmData = await crmResponse.json()

    if (!crmResponse.ok) {
      console.error('CRM lead error:', crmData)

      return res.status(crmResponse.status).json({
        success: false,
        message:
          crmData.message || 'CRM could not save this lead.',
      })
    }

    return res.status(200).json({
      success: true,
      duplicate: crmData.duplicate || false,
      message: crmData.message || 'Lead saved in CRM.',
    })
  } catch (error) {
    console.error('CRM forwarding error:', error)

    return res.status(500).json({
      success: false,
      message: 'Could not connect to CRM.',
    })
  }
}