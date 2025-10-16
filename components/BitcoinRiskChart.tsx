'use client'

import dynamic from 'next/dynamic'

const BitcoinRiskChart = dynamic(
  () => import('./BitcoinRiskChartContent'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full">
        <div className="bg-black border border-gray-700 p-6">
          <div className="flex items-center justify-center" style={{ height: '494px' }}>
            <div className="text-white">Loading chart...</div>
          </div>
        </div>
      </div>
    )
  }
)

export default BitcoinRiskChart