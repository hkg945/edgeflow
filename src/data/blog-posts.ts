export interface BlogPost {
  slug: string
  title: {
    en: string
    'zh-TW': string
    'zh-CN': string
  }
  excerpt: {
    en: string
    'zh-TW': string
    'zh-CN': string
  }
  content: {
    en: string
    'zh-TW': string
    'zh-CN': string
  }
  date: string
  author: string
  image?: string
  tags: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: "understanding-trend-following",
    title: {
      en: "Mastering Trend Following: A Complete Guide",
      'zh-TW': "掌握趨勢跟隨：完整指南",
      'zh-CN': "掌握趋势跟随：完整指南"
    },
    excerpt: {
      en: "Learn the core principles of trend following strategies and how to apply them in volatile markets.",
      'zh-TW': "學習趨勢跟隨策略的核心原則，以及如何在波動的市場中應用它們。",
      'zh-CN': "学习趋势跟随策略的核心原则，以及如何在波动的市场中应用它们。"
    },
    content: {
      en: `
# Mastering Trend Following

Trend following is one of the most successful trading strategies in history. It's based on a simple premise: if prices are moving in a certain direction, they are likely to continue doing so.

## Core Principles

1. **Follow the Price**: Ignore news, ignore opinions. Price is the ultimate truth.
2. **Cut Losses Short**: If the trend reverses, get out. Protect your capital.
3. **Let Profits Run**: Don't take profit too early. Ride the trend until it bends.

## How EdgeFlow Helps

Our EdgeFlow Trend indicator automates this process by identifying the primary trend and filtering out noise.
      `,
      'zh-TW': `
# 掌握趨勢跟隨

趨勢跟隨是歷史上最成功的交易策略之一。它基於一個簡單的前提：如果價格朝某個方向移動，它們很可能會繼續這樣做。

## 核心原則

1. **跟隨價格**：忽略新聞，忽略觀點。價格是最終的真理。
2. **迅速止損**：如果趨勢反轉，立即出場。保護你的本金。
3. **讓利潤奔跑**：不要太早獲利了結。順勢而為，直到趨勢改變。

## EdgeFlow 如何提供協助

我們的 EdgeFlow Trend 指標通過識別主要趨勢並過濾雜訊，自動化了這個過程。
      `,
      'zh-CN': `
# 掌握趋势跟随

趋势跟随是历史上最成功的交易策略之一。它基于一个简单的前提：如果价格朝某个方向移动，它们很可能会继续这样做。

## 核心原则

1. **跟随价格**：忽略新闻，忽略观点。价格是最终的真理。
2. **迅速止损**：如果趋势反转，立即出场。保护你的本金。
3. **让利润奔跑**：不要太早获利了结。顺势而为，直到趋势改变。

## EdgeFlow 如何提供协助

我们的 EdgeFlow Trend 指标通过识别主要趋势并过滤杂信，自动化了这个过程。
      `
    },
    date: "2024-03-15",
    author: "EdgeFlow Team",
    tags: ["Trading Strategy", "Trend Following", "Education"]
  },
  {
    slug: "risk-management-basics",
    title: {
      en: "Risk Management 101 for Crypto Traders",
      'zh-TW': "加密貨幣交易者的風險管理入門",
      'zh-CN': "加密货币交易者的风险管理入门"
    },
    excerpt: {
      en: "Why position sizing and stop losses are more important than your entry price.",
      'zh-TW': "為什麼倉位大小和止損比你的入場價格更重要。",
      'zh-CN': "为什么仓位大小和止损比你的入场价格更重要。"
    },
    content: {
      en: `
# Risk Management 101

Many traders focus solely on finding the perfect entry. But professional traders know that risk management is what keeps you in the game.

## The 1% Rule

Never risk more than 1% of your total account balance on a single trade. This ensures that even a string of losses won't wipe you out.

## Position Sizing

Calculate your position size based on your stop loss distance. If your stop loss is 5% away, and you want to risk 1% of your account, your position size should be 20% of your account.
      `,
      'zh-TW': `
# 風險管理入門

許多交易者只專注於尋找完美的入場點。但專業交易者知道，風險管理才是讓你在市場中生存的關鍵。

## 1% 法則

永遠不要在單筆交易中承擔超過總帳戶餘額 1% 的風險。這確保了即使連續虧損也不會讓你破產。

## 倉位計算

根據你的止損距離計算倉位大小。如果你的止損距離是 5%，而你想承擔 1% 的帳戶風險，你的倉位大小應該是帳戶的 20%。
      `,
      'zh-CN': `
# 风险管理入门

许多交易者只专注于寻找完美的入场点。但专业交易者知道，风险管理才是让你在市场中生存的关键。

## 1% 法则

永远不要在单笔交易中承担超过总账户余额 1% 的风险。这确保了即使连续亏损也不会让你破产。

## 仓位计算

根据你的止损距离计算仓位大小。如果你的止损距离是 5%，而你想承担 1% 的账户风险，你的仓位大小应该是账户的 20%。
      `
    },
    date: "2024-03-20",
    author: "Alex Chen",
    tags: ["Risk Management", "Trading Psychology"]
  }
]
