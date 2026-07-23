type DeepRecord = Record<string, unknown> | null | undefined

function mapMeter(meter: DeepRecord): DeepRecord {
  if (!meter) return meter
  const m = meter as Record<string, unknown>
  return { ...m, meterNo: Number(m.meterNo) }
}

function mapFlat(flat: DeepRecord): DeepRecord {
  if (!flat) return flat
  const f = flat as Record<string, unknown>
  const electricMeter = mapMeter(f.electricMeter as DeepRecord) as Record<string, unknown> | null
  const gasMeter = mapMeter(f.gasMeter as DeepRecord) as Record<string, unknown> | null
  return {
    ...f,
    electricMeter: electricMeter ? { ...electricMeter, displayValue: electricMeter.meterNo ? `#${electricMeter.meterNo} - ${f.code || ''}` : '-' } : null,
    gasMeter: gasMeter ? { ...gasMeter, displayValue: gasMeter.meterNo ? `#${gasMeter.meterNo} - ${f.code || ''}` : '-' } : null,
  }
}

export function mapTenant(tenant: Record<string, unknown>) {
  return {
    ...tenant,
    flat: mapFlat(tenant.flat as DeepRecord),
    rent: Number(tenant.rent),
    utilities: tenant.utilities != null ? Number(tenant.utilities) : null,
    advance: tenant.advance != null ? Number(tenant.advance) : null,
  }
}
