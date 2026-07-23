type DeepRecord = Record<string, unknown> | null | undefined

export function mapFlatDisplay(flat: DeepRecord): DeepRecord {
  if (!flat) return flat
  const f = flat as Record<string, unknown>
  return {
    ...f,
    displayValue: f.code || '',
    status: f.tenant ? 'Active' : 'Inactive',
  }
}

function mapMeterDisplay(meter: DeepRecord, flatField: string): DeepRecord {
  if (!meter) return meter
  const m = meter as Record<string, unknown>
  const flat = m[flatField] as Record<string, unknown> | null
  return {
    ...m,
    displayValue: flat?.code ? `#${m.meterNo} - ${flat.code}` : `#${m.meterNo} - Unassigned`,
  }
}

export function mapElectricMeterDisplay(meter: DeepRecord): DeepRecord {
  return mapMeterDisplay(meter, 'flat')
}

export function mapGasMeterDisplay(meter: DeepRecord): DeepRecord {
  return mapMeterDisplay(meter, 'flat')
}
