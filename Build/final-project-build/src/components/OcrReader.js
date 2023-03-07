import { useEffect, useRef, useState } from "react"
import { Group, Stack, Text, Image, Progress, Button } from "@mantine/core"
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { createWorker } from "tesseract.js"

const OcrReader = () => {

    const [imageData, setImageData] = useState(null)
    // storing a string and encoding a file to put into that string
    const loadFile = file => {
        const reader = new FileReader()
        reader.onloadend = () => {
            const imageDataUri = reader.result
            setImageData(imageDataUri)
        }
        reader.readAsDataURL(file)
    }

    // progress and ocr result
    const [progress, setProgress] = useState(0)
    const [progressLabel, setProgressLabel] = useState("idle")
    const [ocrResult, setOcrResult] = useState("")

    const workerRef = useRef(null)
    useEffect(() => {
        // creates worker from tesseract.js
        workerRef.current = createWorker({
            logger: message => {
                if ("progress" in message) {
                    setProgress(message.progress)
                    setProgressLabel(message.progress === 1 ? "Done" : message.status)
                }
            }
        })
        return () => {
            workerRef.current?.terminate()
            workerRef.current = null
        }
    }, [])

    const handleExtract = async () => {
        setProgress(0)
        setProgressLabel("starting")

        const worker = workerRef.current
        await worker.load()
        await worker.loadLanguage("eng")
        await worker.initialize("eng")

        const response = await worker.recognize(imageData)
        setOcrResult(response.data.text)
        console.log(response.data)
    }

    return (
        <>
            <Group align="initial" style={{ padding: "10px" }}>
                <Stack style={{ flex: "1" }}>
                    <Dropzone
                        onDrop={files => loadFile(files[0])}
                        accept={IMAGE_MIME_TYPE}
                        multiple={false}
                    >
                        {() => (
                            <Text size="xl" inline>
                                Drag image here or click to select file
                            </Text>
                        )}
                    </Dropzone>

                    {!!imageData && <Image src={imageData} style={{ width: "100%" }} />}
                </Stack>

                <Stack style={{ flex: "1" }}>
                    <Button
                        disabled={!imageData || !workerRef.current}
                        onClick={handleExtract}
                    >
                        Extract
                    </Button>
                    <Text>{progressLabel.toUpperCase()}</Text>
                    <Progress value={progress * 100} />

                    {!!ocrResult && (
                        <Stack>
                            <Text size="xl">RESULT</Text>
                            <Text
                                style={{
                                    fontFamily: "monospace",
                                    background: "white",
                                    padding: "10px"
                                }}
                            >
                                {ocrResult}
                            </Text>
                        </Stack>
                    )}
                </Stack>
            </Group>
        </>
    )
}

export default OcrReader;