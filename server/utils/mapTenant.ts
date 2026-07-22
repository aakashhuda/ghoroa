type DeepRecord = Record<string, unknown> | null | undefined

function mapMeter(meter: DeepRecord): DeepRecord {
  if (!meter) return meter
  return { ...meter, meterNo: Number((meter as Record<string, unknown>).meterNo) }
}

function mapFlat(flat: DeepRecord): DeepRecord {
  if (!flat) return flat
  const f = flat as Record<string, unknown>
  return {
    ...f,
    electricMeter: mapMeter(f.electricMeter as DeepRecord),
    gasMeter: mapMeter(f.gasMeter as DeepRecord),
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
