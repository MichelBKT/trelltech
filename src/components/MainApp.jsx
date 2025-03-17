import WelcomeScreen from './WelcomeScreen';

export default function MainApp({ selectedWorkspace }) {
    return (
        <div className="flex flex-col bg-gray-100 dark:bg-gray-800 w-full h-full">
            {selectedWorkspace ? (
                <img src={"/images/bg-winter.png"} alt={"bg-winter"} className="object-cover w-full h-full"/>
            ) : (
                <WelcomeScreen />
            )}
        </div>
    );
}