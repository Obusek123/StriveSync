export const exercisesOptions = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises',
    headers: {
        'x-rapidapi-key': '325fb9bce3msh6ee665c9e6ea3c2p11fb2bjsn4b34515a4a8e',
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
    },
};

export const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
};
