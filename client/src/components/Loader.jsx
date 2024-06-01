import { InfinitySpin } from 'react-loader-spinner';

export default function Loader() {
    return (
        <div className="loader bg-transparent  w-[100vw] h-[100vh] flex justify-center items-center">
            {/* make this container div transparent using tailwind css */}
            <div className="loading_container">
                <InfinitySpin
                    visible={true}
                    width="200"
                    color="#4fa94d"
                    ariaLabel="infinity-spin-loading"
                />
            </div>
        </div>
    )
}