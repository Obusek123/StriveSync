import React, { memo, useRef } from 'react';

const HorizontalScrollBar = ({ data, bodyPart, setBodyPart }) => {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -200,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 200,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div
            style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <button
                onClick={scrollLeft}
                style={{
                    position: 'absolute',
                    left: '0',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    border: 'none',
                    padding: '10px',
                    cursor: 'pointer',
                    fontSize: '2rem',
                    zIndex: 1,
                }}
            >
                &#9664;
            </button>

            <div
                ref={scrollRef}
                className='scroll-container'
                style={{
                    display: 'flex',
                    gap: '20px',
                    padding: '10px 0',
                    overflowX: 'auto',
                    width: '100%',
                }}
            >
                {data.map((item, index) => (
                    <div
                        key={index}
                        title={item}
                        onClick={() => setBodyPart(item)}
                        tabIndex={0}
                        onKeyPress={(e) =>
                            e.key === 'Enter' && setBodyPart(item)
                        }
                        style={{
                            cursor: 'pointer',
                            padding: '20px',
                            borderRadius: '8px',
                            minWidth: '200px',
                            textAlign: 'center',
                            backgroundColor:
                                bodyPart === item ? 'lightgray' : 'transparent',
                            transition: 'background-color 0.3s ease',
                            userSelect: 'none',
                            marginRight: '50px',
                        }}
                    >
                        <div
                            style={{
                                fontWeight: 'bold',
                            }}
                        >
                            {item.charAt(0).toUpperCase() +
                                item.slice(1).toLowerCase()}
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={scrollRight}
                style={{
                    position: 'absolute',
                    right: '0',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    border: 'none',
                    padding: '10px',
                    cursor: 'pointer',
                    fontSize: '2rem',
                    zIndex: 10,
                }}
            >
                &#9654;
            </button>
        </div>
    );
};

export default memo(HorizontalScrollBar);
