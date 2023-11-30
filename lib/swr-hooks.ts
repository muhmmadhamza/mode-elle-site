import useSWR from 'swr'

function fetcher(url: string) {
  return window.fetch(url).then((res) => res.json())
}

export function useEntries() {
  const { data, error } = useSWR(`/api/get-entries`, fetcher)

  return {
    entries: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function usePortfolio(uid: string | number) {
    return useSWR(uid ? `/api/portfolio/get-portfolio?uid=${uid}` : null, fetcher)
}

export function usePortfolios(divisionName: string) {
  return useSWR(divisionName ? `/api/portfolio/get-portfolios?divisionName=${divisionName}` : null, fetcher)
}

export function useMeasurements(uid: string) {
  return useSWR(uid ? `/api/portfolio/get-measurements?uid=${uid}`: null, fetcher)
}

export function usePortfolioImages(uid: string) {
  return useSWR(uid ? `/api/portfolio/get-portfolio-images?uid=${uid}`: null, fetcher)
}

export function useCalendarEvents() {
  return useSWR(`/api/calendar/get-events`, fetcher)
}