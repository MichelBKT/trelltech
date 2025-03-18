import WelcomeScreen from './WelcomeScreen';
import PropTypes from 'prop-types';

MainApp.propTypes = {
    selectedWorkspace: PropTypes.object,
}

export default function MainApp({ selectedWorkspace }) {
    return (
        <div className="flex flex-col bg-gray-100 w-full h-full">
            {selectedWorkspace ? (
                <img src={"/images/bg-winter.png"} alt={"bg-winter"} className="object-cover w-full h-full"/>
            ) : (
                <WelcomeScreen />
            )}
        </div>
    );
}