import { useState, useEffect, useRef } from 'react'
import { useLocation, useHistory } from 'react-router'
import { getGithubTimestamp } from '../Components'
import { toMonthDayYearString, toMonthYearString } from './'
import DewyParserWrapper from '../wasm/dewy_parser_wrapper'

interface useQueryReturn {
    params: { [key: string]: string }
    setParam: (key: string, value: string) => void
    clearParam: (key: string) => void
}

//custom hook for managing query parameters in the url
export const useQuery = (): useQueryReturn => {
    const history = useHistory()
    const { pathname, search } = useLocation()

    //convert the search string to a query object
    const urlParams = new URLSearchParams(search)

    //convert the query object to a dictionary containing each entry
    const params: useQueryReturn['params'] = {}
    urlParams.forEach((value: string, key: string) => {
        params[key] = value
    })

    //callback functions for changing the url parameters
    const setParam = (key: string, value: string): void => {
        urlParams.set(key, value)
        history.push({ pathname, search: urlParams.toString() })
    }
    const clearParam = (key: string): void => {
        urlParams.delete(key)
        history.push({ pathname, search: urlParams.toString() })
    }

    return { params, setParam, clearParam }
}

//Hook for getting a timestamp string for a given git repo
export const useGithubTimestamp = (repoName: string, includeDay: boolean = false): string => {
    //fetch the timestamp and store into the timestamp state
    //undefined indicates not yet returned, null indicates failed to fetch
    const [timestamp, setTimestamp] = useState<Date | undefined | null>()
    useEffect(() => {
        getGithubTimestamp(repoName, (repoTimestamp?: Date) => {
            setTimestamp(repoTimestamp ?? null)
        })
        return (): void => setTimestamp(undefined)
    }, [repoName])

    //handle the string output based on the value of the timestamp
    const [timestampStr, setTimestampStr] = useState<string>('Fetching Date...')
    useEffect(() => {
        if (timestamp === undefined) {
            setTimestampStr('Fetching Date...')
        } else if (timestamp === null) {
            setTimestampStr('Unknown Date')
        } else {
            setTimestampStr(includeDay ? toMonthDayYearString(timestamp) : toMonthYearString(timestamp))
        }
    }, [timestamp, includeDay])

    return timestampStr
}

//hook for managing strings output from the dewy parser process
export const useStringBuffer = (): [string | undefined, (chunk: string) => void, () => void, () => void] => {
    // const [buffer, setBuffer] = useState<string | undefined>()
    const bufferRef = useRef<string[]>()
    const [output, setOutput] = useState<string | undefined>()

    //add a chunk to the buffer
    const addChunk = (chunk: string) => {
        if (bufferRef.current === undefined) {
            bufferRef.current = []
        }
        bufferRef.current.push(chunk)
    }

    //call when done reading input to turn on the output string
    const flushBuffer = () => {
        //combine every chunk into a single big string
        setOutput(bufferRef.current?.join('\n'))
    }

    //reset everything to initial
    const reset = () => {
        bufferRef.current = undefined
        setOutput(undefined)
    }

    return [output, addChunk, flushBuffer, reset]
}

//hook for managing dewy parser web assembly
export const useDewyWasm = (grammar_source: string, input_source: string) => {
    //promise to the wasm interface module
    const wasmPromiseRef = useRef<Promise<any>>()

    //func for calling the parser
    // const [dewyParser, setDewyParser] = useState<(grammar_source: string, input_source: string) => void | undefined>()
    // const dewyParserRef = useRef<(grammar_source: string, input_source: string) => void>()

    //handling of string output from the parser process
    const [parserOutput, addParserChunk, flushParserOutput, resetParserOutput] = useStringBuffer()

    //handle setting up the wasm module and the function for calling the parser
    useEffect(() => {
        //kick of the loading process for getting the functions, and then call the result
        wasmPromiseRef.current = DewyParserWrapper({
            onRuntimeInitialized: async () => {
                //save the function for calling the parser
                console.log('wasm runtime initialized')
                const wasm: any = await wasmPromiseRef.current
                const dewyParser = wasm.cwrap('dewy_parser', 'void', ['string', 'string'])
                dewyParser(grammar_source, input_source)
                flushParserOutput()
            },
            //override the module's code for locating the wasm binary
            /* eslint-disable @typescript-eslint/no-var-requires */
            locateFile: () => require('../wasm/dewy_parser_wrapper.wasm').default,
            //override the print function to write to our custom buffer
            print: (text: string) => {
                addParserChunk(text)
            },
        })

        //clean up at the end of every render
        return () => {
            resetParserOutput()
        }
    }, [grammar_source, input_source])

    //return the parser output as a single string
    //TODO->break up the output based on specific sections of the string e.g. \n>>>>>>>>>>TABLE>>>>>>>>>>\n etc.
    return parserOutput
}
