import PropTypes from 'prop-types';

export const getAvatarUrl = (member) => {
    if (!member?.avatarHash) return null;
    return `https://trello-members.s3.amazonaws.com/${member.id}/${member.avatarHash}/170.png`;
};

export const AvatarFallback = ({ name, className = "" }) => {
    return (
        <div className={`w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center ${className}`}>
            <span className="text-sm text-gray-600 dark:text-white">
                {name?.charAt(0) || '?'}
            </span>
        </div>
    );
};

AvatarFallback.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string
};

export const Avatar = ({ member, className = "", size = "md" }) => {
    const avatarUrl = getAvatarUrl(member);
    const sizeClasses = {
        sm: "w-6 h-6",
        md: "w-8 h-8",
        lg: "w-10 h-10",
        xl: "w-12 h-12"
    };

    if (!avatarUrl) {
        return <AvatarFallback name={member?.fullName} className={`${sizeClasses[size]} ${className}`} />;
    }

    return (
        <img
            src={avatarUrl}
            alt={member?.fullName}
            className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
            onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `<div class="${sizeClasses[size]} rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                    <span class="text-sm text-gray-600 dark:text-white">${member?.fullName?.charAt(0) || '?'}</span>
                </div>`;
            }}
        />
    );
};

Avatar.propTypes = {
    member: PropTypes.shape({
        id: PropTypes.string,
        avatarHash: PropTypes.string,
        fullName: PropTypes.string
    }).isRequired,
    className: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl'])
}; 