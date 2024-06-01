import { InfinitySpin } from 'react-loader-spinner';

export default function Loader() {
    return (
        <div className="loader bg-transparent fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50  w-[100vw] h-[100vh] flex justify-center items-center">
            {/* make this container div transparent using tailwind css */}
            <div className="loading_container">
                <InfinitySpin
                    visible={true}
                    width="200"
                    color="#1565c0"
                    ariaLabel="infinity-spin-loading"
                />
            </div>
        </div>
    )
}