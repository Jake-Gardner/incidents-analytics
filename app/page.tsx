'use client'

import dynamic from 'next/dynamic'
// import FileUpload from '../components/fileUpload'
// import Map from '../components/map'
// import IncidentAnalytics from '../components/incidentAnalytics'

// For some reason, the 'use client' tag was not enough to suppress "window is not defined"
// errors coming from the react-leaflet library in map.tsx. Doing the dynamic load here and
// specifying server-side rendering "false" fixes it.
const IncidentAnalytics = dynamic(() => import('../components/incidentAnalytics'), {
  ssr: false
})

export default function Page() {
  return (
    <div>
      <IncidentAnalytics />
    </div>
  )
}