import React from 'react';

const LoadingSpinner = ({ isLoading }) => {
    return (
        <>
            {
                isLoading && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 ">
                        <div className="bg-white w-1/2 p-6 rounded-lg">
                            <div className="flex items-center justify-center">
                                <div className="spinner"></div>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    );
};

export default LoadingSpinner;
