import React from 'react'
import { SunIcon, BoltIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import ColumnCard from './ColumnCard';

function InfoColumns() {
    type Row = {
        id: string;
        question: string;
    };

    type Column = {
        id: string;
        title: string;
        rows: Row[];
    };

    const columnInfo = [
        {
            id: 'column-1',
            title: 'Examples',
            rows: [
                {
                    id: 'question-1',
                    question: 'Explain something to me',
                },
                {
                    id: 'question-2',
                    question: 'What is the difference between a dog and a cat',
                },
                {
                    id: 'question-3',
                    question: 'What color is the sun'
                }
            ],
        },
        {
            id: 'column-2',
            title: 'Capabilities',
            rows: [
                {
                    id: 'question-1',
                    question: 'Change the ChatGPT Model to use',
                },
                {
                    id: 'question-2',
                    question: "Messages are stored in Firebase's Firestore",
                },
                {
                    id: 'question-3',
                    question: 'Hot Toast notifications when ChatGPT is thinking'
                }
            ],
        },
        {
            id: 'column-3',
            title: 'Limitations',
            rows: [
                {
                    id: 'question-1',
                    question: 'May occasionally generate incorrect information',
                },
                {
                    id: 'question-2',
                    question: "May occasionally produce harmful instructions or blased content",
                },
                {
                    id: 'question-3',
                    question: 'Limited knowledge of world after 2021'
                }
            ],

        },
    ];




    return (
        <div className="flex flex-col items-center justify-center mb-5">
            {columnInfo.map((col) => (
                <ColumnCard key={col.id} column={col} />
            ))}
        </div>
    );



}

export default InfoColumns