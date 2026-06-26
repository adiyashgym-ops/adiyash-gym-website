import { useState } from 'react'
import { siteConfig } from '../content/siteData'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider text-offwhite text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="font-body text-lg md:text-xl text-offwhite/70 text-center max-w-2xl mx-auto mb-12">
          Everything you need to know before joining
        </p>
        
        <div className="space-y-4">
          {siteConfig.faqs.map((faq, index) => (
            <div key={index} className="bg-black/30 border border-offwhite/10 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-offwhite/5 transition-colors"
              >
                <span className="font-heading text-offwhite text-lg">{faq.question}</span>
                <span className="text-purple text-2xl">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="font-body text-offwhite/70">{faq.answer}</p>
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