'use client'
import { useRef, useEffect } from 'react'
import { PyModule } from '@/app/(hooks)/pyodide'
import { DewyDemo } from '@/app/projects/dewy/dewy'
import { fetch_dewy_interpreter_source } from '@/app/projects/dewy/fetch_dewy'
import { useSearchParams } from 'next/navigation'

const Page = async (): Promise<JSX.Element> => {
    const dewy_interpreter_source = await fetch_dewy_interpreter_source()

    return (
        <div className="w-screen h-screen absolute top-0 left-0 z-50 bg-black overflow-y-scroll">
            {<Content dewy_interpreter_source={dewy_interpreter_source} />}
        </div>
    )
}

const Content = ({ dewy_interpreter_source }: { dewy_interpreter_source: PyModule[] }): JSX.Element => {
    // check url parameter for initial code to give to demo
    const searchParams = useSearchParams()
    const src = searchParams.get('src') || 'printl"Hello, World!"'
    const id = searchParams.get('id') || 'DewyIframe'
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                // Post message to parent with size
                const { width, height } = entry.contentRect
                window.parent.postMessage({ width, height, id }, '*') //anywhere is welcome to iframe and receive the message
            }
        })

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current)
        }

        return () => resizeObserver.disconnect()
    }, [])

    return (
        <div ref={containerRef}>
            <div className="p-2">
                <DewyDemo dewy_interpreter_source={dewy_interpreter_source} initial_code={src} />
            </div>
        </div>
    )
}

export default Page
