export default function Footer(){
    const footerStyle = {
        position: 'fixed', // or 'absolute' if preferred
        bottom: 0,
        width: '100%',
        backgroundColor: '#f0f0f0',
        padding: '10px',
        textAlign: 'center',
        zIndex: 1, // Ensure the footer is behind the game board
    };

    return (
        <footer style={footerStyle}>
            Footer here
        </footer>
    );
};
