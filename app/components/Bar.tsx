import Image from 'next/image';

export default function Bar() {

    return (
        <div id="bottomCenterPanel" className="bg-white border-black border rounded-lg flex w-80">
            {/* Left Side Buttons */}
            <div className="flex flex-col justify-center border-r border-black">
                {/* Mouse Button */}
                <button className="flex justify-center items-center w-8 h-8 border-black rounded-tl-lg border-b bg-white hover:bg-gray-200">
                    <Image src="/mouse.svg" alt="Mouse Icon" width={16} height={16} draggable={false} />
                </button>
                {/* Hand Button */}
                <button className="flex justify-center items-center w-8 h-8 bg-white rounded-bl-lg hover:bg-gray-200">
                    <Image src="/hand.svg" alt="Mouse Icon" width={15} height={15} draggable={false} />
                </button>
            </div>

            {/* Right Side Placeholder */}
            <div className="flex-1 flex items-center justify-center">
                {/* Add more elements here */}
                <span className="text-gray-500">Content goes here</span>
            </div>
        </div>

    );
}