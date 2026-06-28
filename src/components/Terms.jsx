import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Terms = () => {
  return (
    <section className="min-h-screen bg-cream py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-purple hover:text-purple-light font-body mb-6 inline-block">
          ← Back to Home
        </Link>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-['Anton'] text-[#832D81] text-4xl md:text-5xl lg:text-6xl flex items-center justify-center gap-1 flex-wrap mb-8"
        >
          <span>AD</span>
          <img 
            src="/red-mark.png" 
            alt="" 
            className="h-[0.85em] inline-block align-middle" 
          />
          <span>YASH</span>
          <span className="text-ink">TERMS & CONDITIONS</span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-4 text-ink/70 font-body"
        >
          <p><strong>Last updated:</strong> June 2026</p>
          
          <p>Welcome to Adiyash Gym! Please read these Terms of Use carefully. They govern your use of the Adiyash Gym online service. If you proceed to use our online service, it will automatically amount to your consent to this Agreement.</p>
          
          <p>If you do not agree with these Terms of Use, please do not use this service.</p>
          
          <p>The terms may be modified occasionally, so check this page regularly to stay updated.</p>
          
          <p>Your failure to follow these Terms may result in immediate termination of your access to the service, as well as resort to other legal remedies available to the service provider.</p>

          <h2 className="text-ink font-heading text-xl mt-6">Information Shared by Users</h2>
          <p>Information shared including advice and opinions or statements made by users in their interaction with other users is their view and responsibility and Adiyash Gym does not necessarily endorse, support, sanction or agree with it.</p>

          <h2 className="text-ink font-heading text-xl mt-6">Use of the Service</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Every user is responsible for their use of the Service.</li>
            <li>You should use the Service in a reasonable and lawful manner. Your communications should not be obscene, indecent or offensive in any way.</li>
            <li>You agree not to post any material protected by copyright, trademark or other proprietary rights without the express permission of the owner.</li>
            <li>Adiyash Gym contains copyrighted material, trademarks and other proprietary information. You are prohibited from publishing, copying, or in any way exploiting any of the content of the service, in whole or in part.</li>
            <li>You agree upon registration to provide accurate and complete name and email address information, and to promptly update this information from time to time as needed.</li>
            <li>Any information given on Adiyash Gym should be used under the supervision of a trainer or in consultation with a registered medical practitioner.</li>
          </ul>

          <h2 className="text-ink font-heading text-xl mt-6">Membership</h2>
          <p>Membership is subject to our membership agreement. All payments are non-refundable. Members must follow gym rules and respect staff and other members.</p>

          <h2 className="text-ink font-heading text-xl mt-6">Code of Conduct</h2>
          <p>Members must follow gym rules and respect staff and other members. Any violation may result in termination of membership.</p>

          <h2 className="text-ink font-heading text-xl mt-6">Liability</h2>
          <p>Exercise at your own risk. Consult a physician before starting any fitness program. Adiyash Gym is not liable for any injuries sustained while using our facilities or following our programs.</p>

          <h2 className="text-ink font-heading text-xl mt-6">Copyright Complaints</h2>
          <p>Adiyash Gym reserves the right to terminate the access of users and account holders who infringe the copyrights of others. If you believe that your work has been posted in infringement of your copyright, you may notify us accordingly with full details.</p>

          <h2 className="text-ink font-heading text-xl mt-6">Indemnification</h2>
          <p>You agree to indemnify Adiyash Gym and its affiliates, employees, agents and representatives, and to hold them harmless from any and all claims and liabilities that may arise from your postings, or from your unauthorized use of material obtained through Adiyash Gym.</p>

          <h2 className="text-ink font-heading text-xl mt-6">Disclaimer of Warranty</h2>
          <p>You acknowledge that you are using Adiyash Gym at your own risk. The service is provided "as is," and the service provider expressly disclaims any and all warranties, express and implied.</p>

          <h2 className="text-ink font-heading text-xl mt-6">Termination</h2>
          <p>Adiyash Gym has the right to terminate your ability to access the service, for any reason, without notice.</p>

          <h2 className="text-ink font-heading text-xl mt-6">Jurisdiction</h2>
          <p>This Agreement shall be governed by and construed in accordance with the laws of India, and jurisdiction for any legal action or proceeding shall be in Mumbai only.</p>

          <h2 className="text-ink font-heading text-xl mt-6">Contact</h2>
          <p>Email: adiyashgym.mail@gmail.com</p>
          <p>Phone: 9076336653</p>
        </motion.div>
      </div>
    </section>
  )
}

export default Terms