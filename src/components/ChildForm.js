import React, {useEffect, useState} from 'react';

const LS_CHILD = "child";
const LS_CHILDREN = "children";

function ChildForm() {
    const [children, setChildren] = useState([]);
    const [child, setChild] = useState({
        id: Math.round(Date.now() / 1000).toString(),
        firstname: "",
        lastname: "",
        dateOfBirth: ""
    });
    const [networkColor, setNetworkColor] = useState("red");
    const [isOnline, setNetwork] = useState(window.navigator.onLine);

    const setOnline = () => {
        setNetwork(true);
        setNetworkColor("green")
    };
    const setOffline = () => {
        setNetwork(false);
        setNetworkColor("red")
    };

    // Register the event listeners
    useEffect(() => {
        window.addEventListener('offline', setOffline);
        window.addEventListener('online', setOnline);

        // cleanup if we unmount
        return () => {
            window.removeEventListener('offline', setOffline);
            window.removeEventListener('online', setOnline);
        }
    }, []);

    // Initialize array of children il local storage (TODO: check)
    useEffect(() => {
        const storageChildren = JSON.parse(localStorage.getItem(LS_CHILDREN));
        if (storageChildren) {
            setChildren(storageChildren);
        }
        //getTest();
    }, []);

    // Update local storage each time children gets updated
    useEffect(() => {
        localStorage.setItem(LS_CHILDREN, JSON.stringify(children));
    }, [children]);

    function handleChangeFirstname(e) {
        setChild({...child, firstname: e.target.value })
    }
    function handleChangeLastname(e) {
        setChild({...child, lastname: e.target.value })
    }
    function handleChangeDateOfBirth(e) {
        setChild({...child, dateOfBirth: e.target.value })
    }

    function addChild(child) {
            const exist = children.some(c => (c.id === child.id ));
            if (exist===false && !children.includes(child)){
                setChildren([...children, child]);
            }
    }

    function handleSubmit(e) {
        setChild({...child, id: Math.round(Date.now() / 1000).toString() })
        localStorage.setItem(LS_CHILD, JSON.stringify(child));
        addChild(child);

        e.preventDefault(); // prevents browser refresh
        setChild({
            id: Math.round(Date.now() / 1000).toString(),
            firstname: "",
            lastname: "",
            dateOfBirth: ""
        });
    }

    function synchronise() {
        //TODO
        console.log("synchronise")
    }

    function DataToSynchronise() {
        const getHeadings = () => {
            return Object.keys(children[0]);
        }
        if (children.length > 0) {
            return <Table theadData={getHeadings()} tbodyData={children}/>
        }
        return <div/>;
    }

    return ( <div>

            <form onSubmit={handleSubmit}>
                <div id='inputs'>
                    <label>
                        Firstname
                        <input type="text" value={child.firstname} onChange={handleChangeFirstname} />
                    </label>
                    <label>
                        Lastname
                        <input type="text" value={child.lastname} onChange={handleChangeLastname} />
                    </label>
                    <label>
                        Date of birth
                        <input type="date" value={child.dateOfBirth} onChange={handleChangeDateOfBirth} />
                    </label>
                    <input type="submit" value="Submit" />
                </div>

            </form>
            <svg height="30" width="30">
                <circle cx="20" cy="20" r="10" fill={networkColor} />
            </svg>
            <DataToSynchronise></DataToSynchronise>
    </div>

    );
}

export default ChildForm;



function Table({theadData, tbodyData}) {
    return (
        <table>
            <thead>
            <tr>
                {theadData.map(heading => {
                    return <th key={heading}>{heading}</th>
                })}
            </tr>
            </thead>
            <tbody>
            {tbodyData.map((row, index) => {
                return <tr key={index}>
                    {theadData.map((key, index) => {
                        return <td key={row[key]}>{row[key]}</td>
                    })}
                </tr>;
            })}
            </tbody>
        </table>
    );
}
