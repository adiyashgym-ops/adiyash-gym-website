import { useState } from 'react'
import { siteConfig } from '../content/siteData'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider text-ink text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="font-body text-lg md:text-xl text-ink/60 text-center max-w-2xl mx-auto mb-12">
          Everything you need to know before joining
        </p>
        
        <div className="space-y-4">
          {siteConfig.faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-ink/10 rounded-lg overflow-hidden shadow-sm">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-cream/50 transition-colors"
              >
                <span className="font-heading text-ink text-lg">{faq.question}</span>
                <span className="text-purple text-2xl">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="font-body text-ink/60">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ