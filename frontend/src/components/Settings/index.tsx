/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useState } from 'react';
import { PlusIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

import AddIsbnModal from './AddIsbnModal';
import SetMakeUpModal from './SetMakeUpModal';

import { useNotification } from '@/context/NotificationContext';
import useData from '@/hooks/useData';

export default function Isbn() {
    const [adIsbnModalView, setAdIsbnModalView] = useState<boolean>(false);
    const [makeUpModalView, setMakeUpModalView] = useState<boolean>(false);
    const [isbns, setIsbns] = useState<string[]>([]);
    const [ebayMakeUp, setEbayMakeUp] = useState<number>(50);
    const [amazonMakeUp, setAmazonMakeUp] = useState<number>(50);
    const [totalUploadCount, setTotalUploadCount] = useState<number>(0);

    const { setSuccessMessage, setErrorMessage } = useNotification();

    const { data, error, loading, fetchData } = useData({
        method: "post",
        url: '/product/search',
        requestBody: { isbns: isbns, ebayMakeUp: ebayMakeUp, amazonMakeUp: amazonMakeUp }
    });

    useEffect(() => {
        if (data) {
            setSuccessMessage(data?.message);
        }
    }, [data]);

    useEffect(() => {
        setErrorMessage(error);
    }, [error]);

    const handleSubmit = () => {
        if (isbns.length > 0 && ebayMakeUp !== undefined && amazonMakeUp !== undefined) {
            fetchData();
        }
    }

    const handleAdIsbnModalView = () => {
        setAdIsbnModalView(!adIsbnModalView);
    };

    const handleSetIsbns = (isbns: string[], totalUploadCount: number) => {
        setIsbns(isbns);
        setTotalUploadCount(totalUploadCount);
    }

    const handeMakeUpModalView = () => {
        setMakeUpModalView(!makeUpModalView);
    };

    const handleSetMakeUp = (ebayMakeUp?: number, amazonMakeUp?: number) => {
        if (ebayMakeUp) {
            setEbayMakeUp(ebayMakeUp);
        }
        if (amazonMakeUp) {
            setAmazonMakeUp(amazonMakeUp);
        }
    }

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl pl-6 font-bold">Settings</h1>
            </div>

            <div className="mt-4 items-center">
                <div className='mt-4'>
                    <div className='text-red-500 p-2'>
                        First: Please add ISBNs.
                    </div>
                    <div className='p-4'>
                        <AddIsbnButton handleModalView={handleAdIsbnModalView} />
                        <div className='pt-4'>{totalUploadCount} ISBNS are uploaded</div>
                    </div>
                    {adIsbnModalView &&
                        <AddIsbnModal handleSetIsbns={handleSetIsbns} handleAdIsbnModalView={handleAdIsbnModalView} />
                    }
                </div>
                <div className='mt-4'>
                    <div className='text-red-500 p-2'>
                        Second: Please set Make UP.
                    </div>
                    <div className='p-4'>
                        <SetMakeUpButton handleModalView={handeMakeUpModalView} />
                        <div className='pt-4'>Ebay MakUp: {ebayMakeUp}% Makeup is setted</div>
                        <div className='pt-4'>Amazon MakUp: {amazonMakeUp}% Makeup is setted</div>
                        {makeUpModalView &&
                            <SetMakeUpModal handleSetMakeUp={handleSetMakeUp} handeMakeUpModalView={handeMakeUpModalView} />
                        }
                    </div>
                </div>
                <div className="mt-4">
                    <div className='text-red-500 p-2'>
                        Finally: Please submit now.
                    </div>
                    <div className='p-4'>
                        <SubmitButton handleSubmit={handleSubmit} loading={loading} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function AddIsbnButton({ handleModalView }: { handleModalView: () => void }) {
    return (
        <button
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={handleModalView}
        >
            <span className="hidden md:block">ADD ISBN</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
        </button>
    );
}

export function SetMakeUpButton({ handleModalView }: { handleModalView: () => void }) {
    return (
        <button
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={handleModalView}
        >
            <span className="hidden md:block">SET MAKEUP</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
        </button>
    );
}

export function SubmitButton({ handleSubmit, loading }: { handleSubmit: () => void, loading: boolean }) {
    return (
        <button
            className="flex w-[170px] h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={handleSubmit}
            disabled={loading}
        >
            <div className="mx-auto">
                {loading ? (<svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>) : (
                    <div className='flex'>
                        <span className="hidden md:block">SUBMIT ISBNS</span>{''}
                        <ArrowRightIcon className="h-5 md:ml-4" />
                    </div>
                )}
            </div>
        </button>
    );
}