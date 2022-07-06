export const TimerComponent = ({ duration, onExpire = () => { } }) => {

    const [time, setTime] = useState([duration - 1, 59]);

    useEffect(() => {
        if (time[0] === 0 && time[1] === 0) {
            onExpire(true);
        }
    }, [time])

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(time => {
                const newSeconds = time[1] - 1;
                if (newSeconds > 0) {
                    return [time[0], newSeconds];
                }
                else {
                    const newMinutes = time[0] - 1;
                    if (newMinutes > 0) {
                        return [newMinutes, 59];
                    }
                    else {
                        clearInterval(interval);
                        return [0, 0]
                    }
                }
            })

        }, 1000);

        return () => {
            clearInterval(interval)
        }
    }, [])

    return <>
        {
            time[0] > 0 || time[1] > 0 ? <p>
                <span >This payment will expire in </span>
                <span style={{ color: '#E57C7C' }} >{`${time[0]}:${time[1]}`}</span>
            </p> : <div style={{
                color: '#E57C7C'
            }}>
                Payment is overdue
            </div>

        }
    </>

}