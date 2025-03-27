import React, { useState } from "react"
import { Search } from "lucide-react"
import { motion } from "motion/react"
import { Clock } from "@/components/clock"

export default function App() {
  // 添加搜索关键词状态
  const [searchQuery, setSearchQuery] = useState("")

  // 添加获取问候语的函数
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) {
      return "早上好"
    } else if (hour >= 12 && hour < 18) {
      return "下午好"
    } else if (hour >= 18 && hour < 22) {
      return "晚上好"
    } else {
      return "夜深了"
    }
  }

  // 处理搜索功能
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    // 如果输入的是URL，直接跳转
    if (
      searchQuery.match(/^https?:\/\//i) ||
      searchQuery.match(/^[a-zA-Z0-9][-a-zA-Z0-9]+\.[a-zA-Z]{2,}$/)
    ) {
      const url = searchQuery.startsWith("http")
        ? searchQuery
        : `https://${searchQuery}`
      window.location.href = url
    } else {
      // 否则使用Google搜索
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
        searchQuery
      )}`
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 p-8">
        <div className="w-full max-w-2xl space-y-6">
          <motion.div
            className="space-y-2 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-medium">{getGreeting()}，TinsFox。</h2>
          </motion.div>

          <motion.div
            className="relative max-w-[584px] w-full mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form
              onSubmit={handleSearch}
              className="flex items-center w-full px-4 py-3 bg-input border border-input-border rounded-full hover:bg-input-background-hover focus-within:shadow-[0_0_0_1px_var(--input-border-focus)] transition-all duration-200"
            >
              <Search className="w-5 h-5 mr-3 text-secondary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="在 Google 上搜索，或者输入一个网址"
                className="w-full bg-transparent outline-none placeholder-secondary"
              />
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8"
          >
            <Clock />
          </motion.div>
        </div>
      </main>
    </div>
  )
}
