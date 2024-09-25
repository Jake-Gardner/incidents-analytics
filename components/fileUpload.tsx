'use client'

import { useState } from 'react'
import { Incident } from '../types'

interface Props {
    setRawData: (data: Incident) => void
}

export default function FileUpload({ setRawData }: Props) {
    const [fileName, setFileName] = useState('')

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFileName(e.target.files[0].name)
            const fileReader = new FileReader()
            fileReader.readAsText(e.target.files[0], "UTF-8")
            fileReader.onload = e => {
                setRawData(JSON.parse(e.target.result as string))
            }
        }
    }

    const handleClear = () => {
        setFileName('')
        setRawData(undefined)
    }

    return (
        <div style={{ margin: 15 }}>
            {!fileName && <input type='file' onChange={handleFileChange} />}
            {fileName && <div>
                <span>{fileName}</span>
                <button style={{ marginLeft: 10 }} onClick={handleClear}>&#10006;</button>
            </div>}
        </div>
    )
}
