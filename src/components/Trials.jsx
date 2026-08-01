import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { 
  getAllTrials, 
  addTrial, 
  searchTrialsByPhone,
  checkExistingTrial,
  uploadTrialPhoto,
  deleteTrialPhoto,
  updateTrial
} from '../lib/trialTracker'

const Trials = () => {
  const navigate = useNavigate()
  const [trials, setTrials] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchPhone, setSearchPhone] = useState('')
  const [searchResult, setSearchResult] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editingTrial, setEditingTrial] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    branch: '',
    trial_date: '',
    trial_time: '',
    photo_url: '',
  })
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)
  
  // Webcam states
  const [showWebcam, setShowWebcam] = useState(false)
  const [capturedPhoto, setCapturedPhoto] = useState(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  // File input ref for "Add Photo" option
  const fileInputRef = useRef(null)

  const branches = [
    'Kurla',
    'Vikhroli',
    'Kandivali',
    'Asalfa Unisex',
    'Asalfa Ladies',
    'Marol',
    'Thane-Vfour9',
  ]

  useEffect(() => {
    const loadTrials = async () => {
      setLoading(true)
      const data = await getAllTrials(200)
      setTrials(data)
      setLoading(false)
    }
    loadTrials()
  }, [])

  // ===== WEBCAM FUNCTIONS =====
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        } 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play()
        }
      }
      setShowWebcam(true)
    } catch (err) {
      setFormError('❌ Could not access webcam. Please check permissions.')
      console.error('Webcam error:', err)
      setTimeout(() => setFormError(''), 3000)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      canvas.width = video.videoWidth || 640
      canvas.height = video.videoHeight || 480
      canvas.getContext('2d').drawImage(video, 0, 0)
      const photoData = canvas.toDataURL('image/jpeg', 0.8)
      setCapturedPhoto(photoData)
      setShowWebcam(false)
      
      const stream = video.srcObject
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
        video.srcObject = null
      }
    }
  }

  const cancelWebcam = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
        videoRef.current.srcObject = null
      }
    }
    setShowWebcam(false)
  }

  // ===== FILE UPLOAD FUNCTION =====
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setFormError('❌ Please select an image file.')
      setTimeout(() => setFormError(''), 3000)
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormError('❌ Image too large. Please select a file under 5MB.')
      setTimeout(() => setFormError(''), 3000)
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      setCapturedPhoto(event.target.result)
    }
    reader.readAsDataURL(file)
    
    e.target.value = ''
  }

  const removePhoto = () => {
    setCapturedPhoto(null)
    setFormData({ ...formData, photo_url: '' })
  }

  // ===== CONVERT DATA URL TO FILE =====
  const dataURLToFile = (dataURL, filename) => {
    const arr = dataURL.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }

  // ===== HANDLE SEARCH =====
  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchPhone.trim()) {
      setSearchResult(null)
      return
    }
    const results = await searchTrialsByPhone(searchPhone.trim())
    setSearchResult(results)
  }

  // ===== HANDLE ADD TRIAL =====
  const handleAddTrial = async (e) => {
    e.preventDefault()
    setFormError('')
    setFormSuccess('')
    setSubmitting(true)

    if (!formData.name || !formData.phone || !formData.branch || !formData.trial_date || !formData.trial_time) {
      setFormError('Please fill in all fields')
      setSubmitting(false)
      return
    }

    const existing = await checkExistingTrial(formData.phone)
    if (existing.exists) {
      setFormError(`❌ Already trialed on ${existing.trialData.trial_date} at ${existing.trialData.branch}`)
      setSubmitting(false)
      return
    }

    let photoUrl = ''
    if (capturedPhoto) {
      const file = dataURLToFile(capturedPhoto, `${formData.phone}-photo.jpg`)
      const uploadResult = await uploadTrialPhoto(file, formData.phone)
      if (uploadResult.success) {
        photoUrl = uploadResult.url
      } else {
        setFormError(`❌ Failed to upload photo: ${uploadResult.error}`)
        setSubmitting(false)
        return
      }
    }

    const trialData = {
      ...formData,
      photo_url: photoUrl,
    }

    const result = await addTrial(trialData)
    if (result.success) {
      setFormSuccess('✅ Trial added successfully!')
      setTrials([result.data, ...trials])
      setFormData({
        name: '',
        phone: '',
        branch: '',
        trial_date: '',
        trial_time: '',
        photo_url: '',
      })
      setCapturedPhoto(null)
      setShowAddForm(false)
    } else {
      setFormError(`❌ ${result.error}`)
    }
    setSubmitting(false)
  }

  // ===== HANDLE EDIT =====
  const handleEditClick = (trial) => {
    setEditingTrial(trial)
    setFormData({
      name: trial.name,
      phone: trial.phone,
      branch: trial.branch,
      trial_date: trial.trial_date,
      trial_time: trial.trial_time,
      photo_url: trial.photo_url || '',
    })
    setCapturedPhoto(trial.photo_url || null)
    setShowEditForm(true)
    setFormError('')
    setFormSuccess('')
  }

  // ===== HANDLE UPDATE TRIAL =====
  const handleUpdateTrial = async (e) => {
    e.preventDefault()
    setFormError('')
    setFormSuccess('')
    setSubmitting(true)

    if (!formData.name || !formData.phone || !formData.branch || !formData.trial_date || !formData.trial_time) {
      setFormError('Please fill in all fields')
      setSubmitting(false)
      return
    }

    let photoUrl = formData.photo_url

    if (capturedPhoto && capturedPhoto.startsWith('data:')) {
      if (formData.photo_url) {
        await deleteTrialPhoto(formData.photo_url)
      }
      const file = dataURLToFile(capturedPhoto, `${formData.phone}-photo.jpg`)
      const uploadResult = await uploadTrialPhoto(file, formData.phone)
      if (uploadResult.success) {
        photoUrl = uploadResult.url
      } else {
        setFormError(`❌ Failed to upload photo: ${uploadResult.error}`)
        setSubmitting(false)
        return
      }
    }

    const result = await updateTrial(editingTrial.id, {
      ...formData,
      photo_url: photoUrl,
    })

    if (result.success) {
      setFormSuccess('✅ Trial updated successfully!')
      const updated = await getAllTrials(200)
      setTrials(updated)
      setShowEditForm(false)
      setEditingTrial(null)
      setFormData({
        name: '',
        phone: '',
        branch: '',
        trial_date: '',
        trial_time: '',
        photo_url: '',
      })
      setCapturedPhoto(null)
    } else {
      setFormError(`❌ ${result.error}`)
    }
    setSubmitting(false)
  }

  // ===== HANDLE DELETE =====
  const handleDeleteTrial = async (id, name, photoUrl) => {
    if (!window.confirm(`Delete trial for "${name}"?`)) return

    try {
      if (photoUrl) {
        await deleteTrialPhoto(photoUrl)
      }

      const { error } = await supabase
        .from('trials')
        .delete()
        .eq('id', id)

      if (error) throw error

      setFormSuccess('✅ Trial deleted successfully!')
      const updated = await getAllTrials(200)
      setTrials(updated)
      if (searchResult) {
        setSearchResult(searchResult.filter(t => t.id !== id))
      }
      setTimeout(() => setFormSuccess(''), 3000)
    } catch (err) {
      setFormError(`❌ ${err.message}`)
      setTimeout(() => setFormError(''), 3000)
    }
  }

  const handleLogout = () => {
    navigate('/')
  }

  if (loading) {
    return (
      <section className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-ink font-body">Loading trials...</div>
      </section>
    )
  }

  const renderTrialRow = (trial) => (
    <tr key={trial.id} className="border-t border-ink/5 hover:bg-cream/50">
      <td className="py-3 px-3">
        <div className="flex items-center gap-3">
          {trial.photo_url ? (
            <img
              src={trial.photo_url}
              alt={trial.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-purple/20"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-ink/10 flex items-center justify-center text-ink/30 text-xs">
              No photo
            </div>
          )}
          <span className="font-medium text-ink">{trial.name}</span>
        </div>
      </td>
      <td className="py-3 px-3 text-ink/60">{trial.phone}</td>
      <td className="py-3 px-3 text-ink/60">{trial.branch}</td>
      <td className="py-3 px-3 text-ink/60">{trial.trial_date}</td>
      <td className="py-3 px-3 text-ink/60">{trial.trial_time}</td>
      <td className="py-3 px-3">
        <button
          onClick={() => handleEditClick(trial)}
          className="bg-purple/10 text-purple px-4 py-1.5 rounded text-xs font-body hover:bg-purple/20 transition-all mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteTrial(trial.id, trial.name, trial.photo_url)}
          className="bg-red-500/10 text-red-500 px-4 py-1.5 rounded text-xs font-body hover:bg-red-500/20 transition-all"
        >
          Delete
        </button>
      </td>
    </tr>
  )

  return (
    <section className="min-h-screen bg-cream py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-heading text-4xl text-ink">Trial Tracking</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500/20 text-red-500 px-4 py-2 rounded-lg font-body hover:bg-red-500/30 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white border border-ink/10 rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="font-heading text-2xl text-ink mb-4">Search by Phone</h2>
          <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Enter phone number..."
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              className="flex-1 bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors min-w-[200px]"
            />
            <button
              type="submit"
              className="bg-purple text-white px-6 py-3 rounded-lg font-heading uppercase tracking-wider hover:bg-purple-light transition-all"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchPhone('')
                setSearchResult(null)
              }}
              className="bg-ink/10 text-ink px-6 py-3 rounded-lg font-body hover:bg-ink/20 transition-all"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(!showAddForm)
                setFormError('')
                setFormSuccess('')
                setShowEditForm(false)
                setCapturedPhoto(null)
              }}
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-heading uppercase tracking-wider hover:bg-green-400 transition-all ml-auto"
            >
              + Add Trial
            </button>
          </form>

          {searchResult && searchResult.length > 0 && (
            <div className="mt-4 border-t border-ink/10 pt-4">
              <h3 className="font-heading text-lg text-ink mb-3">
                {searchResult.length} trial{searchResult.length > 1 ? 's' : ''} found
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-body">
                  <thead className="bg-cream">
                    <tr>
                      <th className="text-left py-2 px-3 text-ink/60 font-semibold">Name</th>
                      <th className="text-left py-2 px-3 text-ink/60 font-semibold">Phone</th>
                      <th className="text-left py-2 px-3 text-ink/60 font-semibold">Branch</th>
                      <th className="text-left py-2 px-3 text-ink/60 font-semibold">Date</th>
                      <th className="text-left py-2 px-3 text-ink/60 font-semibold">Time</th>
                      <th className="text-left py-2 px-3 text-ink/60 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResult.map((trial) => renderTrialRow(trial))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {searchResult && searchResult.length === 0 && searchPhone && (
            <p className="text-ink/40 font-body mt-4">No trials found for this phone number</p>
          )}
        </div>

        {/* Add Trial Form */}
        {showAddForm && (
          <div className="bg-white border border-ink/10 rounded-lg p-6 mb-8 shadow-sm">
            <h2 className="font-heading text-2xl text-ink mb-4">Add New Trial</h2>
            {formError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-red-600 font-body text-sm">
                {formError}
              </div>
            )}
            {formSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 text-green-600 font-body text-sm">
                {formSuccess}
              </div>
            )}
            <form onSubmit={handleAddTrial} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-body text-ink/60 text-sm block mb-1">Name *</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors"
                  required
                />
              </div>
              <div>
                <label className="font-body text-ink/60 text-sm block mb-1">Phone *</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors"
                  required
                />
              </div>
              <div>
                <label className="font-body text-ink/60 text-sm block mb-1">Branch *</label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors"
                  required
                >
                  <option value="">Select branch...</option>
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-body text-ink/60 text-sm block mb-1">Trial Date *</label>
                <input
                  type="date"
                  value={formData.trial_date}
                  onChange={(e) => setFormData({ ...formData, trial_date: e.target.value })}
                  className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors"
                  required
                />
              </div>
              <div>
                <label className="font-body text-ink/60 text-sm block mb-1">Trial Time *</label>
                <input
                  type="time"
                  value={formData.trial_time}
                  onChange={(e) => setFormData({ ...formData, trial_time: e.target.value })}
                  className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="font-body text-ink/60 text-sm block mb-2">Member Photo</label>
                <div className="flex flex-wrap items-center gap-4">
                  {capturedPhoto ? (
                    <div className="relative">
                      <img
                        src={capturedPhoto}
                        alt="Preview"
                        className="w-24 h-24 rounded-full object-cover border-2 border-purple"
                      />
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-ink/10 flex items-center justify-center text-ink/30 text-xs border-2 border-dashed border-ink/20">
                      No photo
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={startWebcam}
                      className="bg-purple/10 text-purple px-4 py-2 rounded-lg font-body hover:bg-purple/20 transition-all text-sm"
                    >
                      📸 Take Photo
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-blue-500/10 text-blue-600 px-4 py-2 rounded-lg font-body hover:bg-blue-500/20 transition-all text-sm"
                    >
                      📁 Add Photo
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 flex gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`bg-purple text-white px-8 py-3 rounded-lg font-heading uppercase tracking-wider hover:bg-purple-light transition-all ${
                    submitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {submitting ? 'Adding...' : 'Add Trial'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setFormError('')
                    setFormSuccess('')
                    setFormData({
                      name: '',
                      phone: '',
                      branch: '',
                      trial_date: '',
                      trial_time: '',
                      photo_url: '',
                    })
                    setCapturedPhoto(null)
                  }}
                  className="bg-ink/10 text-ink px-8 py-3 rounded-lg font-body hover:bg-ink/20 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Webcam Modal - FIXED */}
        {showWebcam && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full">
              <h3 className="font-heading text-xl text-ink mb-4">Take Photo</h3>
              <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <video
                  ref={videoRef}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  autoPlay
                  playsInline
                  muted
                  style={{ transform: 'scaleX(-1)' }}
                />
                <canvas ref={canvasRef} className="hidden" />
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={capturePhoto}
                  className="bg-purple text-white px-6 py-2 rounded-lg font-heading uppercase tracking-wider hover:bg-purple-light transition-all"
                >
                  Capture
                </button>
                <button
                  onClick={cancelWebcam}
                  className="bg-ink/10 text-ink px-6 py-2 rounded-lg font-body hover:bg-ink/20 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Trial Form */}
        {showEditForm && editingTrial && (
          <div className="bg-white border border-purple/30 rounded-lg p-6 mb-8 shadow-sm">
            <h2 className="font-heading text-2xl text-ink mb-4">Edit Trial</h2>
            {formError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-red-600 font-body text-sm">
                {formError}
              </div>
            )}
            {formSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 text-green-600 font-body text-sm">
                {formSuccess}
              </div>
            )}
            <form onSubmit={handleUpdateTrial} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-body text-ink/60 text-sm block mb-1">Name *</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors"
                  required
                />
              </div>
              <div>
                <label className="font-body text-ink/60 text-sm block mb-1">Phone *</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors"
                  required
                />
              </div>
              <div>
                <label className="font-body text-ink/60 text-sm block mb-1">Branch *</label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors"
                  required
                >
                  <option value="">Select branch...</option>
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-body text-ink/60 text-sm block mb-1">Trial Date *</label>
                <input
                  type="date"
                  value={formData.trial_date}
                  onChange={(e) => setFormData({ ...formData, trial_date: e.target.value })}
                  className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors"
                  required
                />
              </div>
              <div>
                <label className="font-body text-ink/60 text-sm block mb-1">Trial Time *</label>
                <input
                  type="time"
                  value={formData.trial_time}
                  onChange={(e) => setFormData({ ...formData, trial_time: e.target.value })}
                  className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="font-body text-ink/60 text-sm block mb-2">Member Photo</label>
                <div className="flex flex-wrap items-center gap-4">
                  {capturedPhoto ? (
                    <div className="relative">
                      <img
                        src={capturedPhoto}
                        alt="Preview"
                        className="w-24 h-24 rounded-full object-cover border-2 border-purple"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setCapturedPhoto(null)
                          setFormData({ ...formData, photo_url: '' })
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  ) : formData.photo_url ? (
                    <div className="relative">
                      <img
                        src={formData.photo_url}
                        alt="Existing"
                        className="w-24 h-24 rounded-full object-cover border-2 border-purple"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, photo_url: '' })
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-ink/10 flex items-center justify-center text-ink/30 text-xs border-2 border-dashed border-ink/20">
                      No photo
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={startWebcam}
                      className="bg-purple/10 text-purple px-4 py-2 rounded-lg font-body hover:bg-purple/20 transition-all text-sm"
                    >
                      📸 Take Photo
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-blue-500/10 text-blue-600 px-4 py-2 rounded-lg font-body hover:bg-blue-500/20 transition-all text-sm"
                    >
                      📁 Add Photo
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 flex gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`bg-purple text-white px-8 py-3 rounded-lg font-heading uppercase tracking-wider hover:bg-purple-light transition-all ${
                    submitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {submitting ? 'Updating...' : 'Update Trial'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditForm(false)
                    setEditingTrial(null)
                    setFormError('')
                    setFormSuccess('')
                    setFormData({
                      name: '',
                      phone: '',
                      branch: '',
                      trial_date: '',
                      trial_time: '',
                      photo_url: '',
                    })
                    setCapturedPhoto(null)
                  }}
                  className="bg-ink/10 text-ink px-8 py-3 rounded-lg font-body hover:bg-ink/20 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* All Trials Table */}
        <div className="bg-white border border-ink/10 rounded-lg p-6 shadow-sm">
          <h2 className="font-heading text-2xl text-ink mb-4">All Trials ({trials.length})</h2>
          {trials.length === 0 ? (
            <p className="font-body text-ink/40">No trials recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead className="bg-cream">
                  <tr>
                    <th className="text-left py-2 px-3 text-ink/60 font-semibold">Member</th>
                    <th className="text-left py-2 px-3 text-ink/60 font-semibold">Phone</th>
                    <th className="text-left py-2 px-3 text-ink/60 font-semibold">Branch</th>
                    <th className="text-left py-2 px-3 text-ink/60 font-semibold">Date</th>
                    <th className="text-left py-2 px-3 text-ink/60 font-semibold">Time</th>
                    <th className="text-left py-2 px-3 text-ink/60 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {trials.map((trial) => renderTrialRow(trial))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Trials