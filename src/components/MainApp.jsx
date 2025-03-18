import PropTypes from 'prop-types';
import AppWelcome from "./AppWelcome.jsx";

MainApp.propTypes = {
    selectedWorkspace: PropTypes.object,
}

export default function MainApp({ selectedWorkspace }) {
    return (
        <div className="flex flex-col bg-gray-100 w-full h-full">
            {selectedWorkspace ? (
                <img src={"/images/bg-winter.png"} alt={"bg-winter"} className="object-cover w-full h-full"/>
            ) : (
                <AppWelcome/>
            )}
        </div>
    );
}