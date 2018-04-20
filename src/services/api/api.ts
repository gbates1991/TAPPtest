import apisauce from 'apisauce'

export type APIServiceResponse = {
  ok: boolean
  status?: number
  kind: 'success' | 'invalid token' | 'undefined' | 'unknown-error'
  response?: any,
}

export interface APIConfig {
  dev: string
  staging: string
  production: string
}

/**
 * Responsible for talking with API.
 */
export class API {
  api: any
  config: APIConfig
  token: string

  /** Creates the only instance of API service. */
  constructor(config: APIConfig) {
    this.config = config
    this.api = apisauce.create({
      baseURL: this.config.production,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    })
  }

  /** Will be called before any React components are initialized. */
  async setup() {
    // Initialize functionalities here
    this.token = 'KQQEB55VC3HZY0KWLAGE5DUH5BOMHPZWQX3PJJ3E2Q2HVVRH'
  }

  processResponse = response => {
    if (response.ok) {
      return {
        ok: true,
        status: response.status,
        kind: 'success',
        data: response.data,
      }
    } else if (!response.ok && response.status === 401) {
      return {
        ok: false,
        status: response.status,
        kind: 'invalid token',
      }
    }

    return {
      ok: false,
      status: response.status,
      kind: 'unknown-error',
    }
  }
  /**
   * @param near: string
   * @param intent: string
   * @param limit: number
   * @param categoryId: string
   * @param version: string
   */
  searchVenues = async (near, intent, limit, categoryId, version) => {
    const response = await this.api.get(
      `v2/venues/search?oauth_token=${this.token}&near=${near}&intent=${intent}&limit=${limit}&categoryId=${categoryId}&v=${version}`,
    )
    return this.processResponse(response)
  }
}