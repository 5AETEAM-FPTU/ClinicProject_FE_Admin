'use client'
import { useGetQuestionsQuery } from '@/stores/services/demo'
import { Button } from '@nextui-org/react';
import React from 'react'

function DemoModule() {

    const { result, isFetching, refetch } = useGetQuestionsQuery(
        {
            amount: 10,
        },
        {
            selectFromResult({ data, isFetching }) {
                console.log(data);
                return {
                    result: data?.results ?? [],
                    isFetching,
                }
            },
        }
    )

    console.log(result);


    return (
        <div className='w-full h-screen flex-col gap-2 flex justify-center items-center'>
            <h1> DEMO RTK Query to fetching data from an API!</h1>
            <h2>From API: https://opentdb.com/api.php</h2>
            <h3>Total: {result?.length}</h3>
            {
                isFetching ? <p className='font-extrabold'>Fetching data ...</p> : <div className='w-full flex justify-center items-center flex-col'>
                    {result.map((item: any, index: number) => (
                        <div className='w-fit border p-2 mt-2'>
                            <p dangerouslySetInnerHTML={{ __html: item?.question }}></p>
                        </div>
                    ))}
                </div>
            }

            <Button color="default" onClick={() => {refetch()}}>Refetch</Button>

        </div>
    )
}

export default DemoModule
