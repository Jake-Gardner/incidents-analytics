'use client'

import { Incident } from '../types'

interface Props {
    setRawData: (data: Incident) => void
}

export default function FileUpload({ setRawData }: Props) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const fileReader = new FileReader()
            fileReader.readAsText(e.target.files[0], "UTF-8")
            fileReader.onload = e => {
                setRawData(JSON.parse(e.target.result as string))
            }
        }
    }

    return (
        <div>
            <input type='file' onChange={handleFileChange} />
        </div>
    )
}
