import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('App crashed:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] text-[#1D1D1F] px-6">
          <div className="text-center max-w-sm">
            <h1 className="text-xl font-semibold mb-2">發生了一些問題</h1>
            <p className="text-sm text-[#86868B] mb-6">頁面載入時發生錯誤，請重新整理再試一次。</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-full bg-[#0071E3] text-white text-sm hover:bg-[#0077ED] transition-colors duration-[240ms]"
            >
              重新整理
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
