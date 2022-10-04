export interface Temp {
    day: number
    min: number
    max: number
    night: number
    eve: number
    morn: number
}

export interface Weather {
    id: number
    main: string
    description: string
    icon: string
}

export interface FeelsLike {
    day: number
    night: number
    eve: number
    morn: number
}

export interface Current {
    dt: number
    sunrise: number
    sunset: number
    temp: number
    feels_like: number
    pressure: number
    humidity: number
    dew_point: number
    uvi: number
    clouds: number
    visibility: number
    wind_speed: number
    wind_deg: number
    wind_gust: number
    weather: Weather[]
}

export interface Daily {
    dt: number
    sunrise: number
    sunset: number
    moonrise: number
    moonset: number
    moon_phase: number
    temp: Temp
    feels_like: FeelsLike
    pressure: number
    humidity: number
    dew_point: number
    wind_speed: number
    wind_deg: number
    wind_gust: number
    weather: Weather[]
    clouds: number
    pop: number
    uvi: number
}

export interface ForecastResponse {
    lat: number
    lon: number
    timezone: string
    timezone_offset: number
    current: Current
    daily: Daily[]
}

export interface NextDay {
    id: number
    when: string
    desc: string
    min: string
    max: string
    icon: string
}

export interface Forecast {
    id: string
    where: string
    when: string
    desc: string
    temp: string
    icon: string
    nextDays: NextDay[]
}

export interface LocalNames {
    mn: string
    feature_name: string
    ga: string
    jv: string
    io: string
    my: string
    cv: string
    cy: string
    ha: string
    mt: string
    nl: string
    tk: string
    ay: string
    he: string
    bs: string
    kv: string
    vi: string
    lo: string
    ku: string
    pt: string
    lb: string
    gd: string
    ur: string
    ta: string
    av: string
    ba: string
    kl: string
    mk: string
    et: string
    sw: string
    sh: string
    en: string
    az: string
    qu: string
    hi: string
    pa: string
    tw: string
    tl: string
    mr: string
    ne: string
    no: string
    eu: string
    ln: string
    te: string
    bm: string
    tg: string
    oc: string
    af: string
    hu: string
    gl: string
    su: string
    fo: string
    fi: string
    co: string
    fa: string
    sr: string
    ia: string
    ie: string
    kk: string
    ar: string
    sk: string
    na: string
    km: string
    nn: string
    rm: string
    ko: string
    ja: string
    sq: string
    br: string
    id: string
    es: string
    kw: string
    vo: string
    se: string
    ht: string
    yi: string
    sc: string
    sa: string
    wa: string
    lt: string
    mi: string
    bg: string
    ff: string
    am: string
    ms: string
    so: string
    is: string
    tt: string
    zu: string
    fr: string
    gu: string
    el: string
    ps: string
    li: string
    th: string
    ab: string
    sl: string
    bh: string
    hy: string
    ig: string
    gn: string
    pl: string
    tr: string
    gv: string
    fy: string
    st: string
    uz: string
    ug: string
    de: string
    ee: string
    da: string
    nv: string
    or: string
    bi: string
    sv: string
    os: string
    an: string
    kn: string
    ml: string
    ro: string
    sm: string
    uk: string
    cs: string
    lv: string
    ascii: string
    om: string
    bo: string
    to: string
    mg: string
    it: string
    ru: string
    ca: string
    si: string
    ny: string
    ky: string
    fj: string
    eo: string
    be: string
    sd: string
    bn: string
    yo: string
    ce: string
    wo: string
    sn: string
    hr: string
    ka: string
    zh: string
    cu: string
}

export interface Locale {
    name: string
    local_names: LocalNames[]
    lat: number
    lon: number
    country: string
    state: string
}

export type LocalesResponse = Locale[]

export interface CityForecast {
    id?: number
    name?: string
    forecast: Forecast
}

export interface Candidate {
    formatted_address: string
    geometry: Geometry
    name: string
}

export interface Geometry {
    location: Location
    viewport: Viewport
}

export interface Location {
    lat: number
    lng: number
}

export interface Viewport {
    northeast: Northeast
    southwest: Southwest
}

export interface Northeast {
    lat: number
    lng: number
}

export interface Southwest {
    lat: number
    lng: number
}


export interface AutocompleteGooglePlaceResponse {
    candidates: Candidate[]
    status: string
}
