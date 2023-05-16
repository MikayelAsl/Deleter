async function deleter() {
    const {extensions} = await fetch(
        'https://api.contentstack.io/v3/extensions?query="type":"field"',
        {headers: {api_key: process.argv[2], authorization: process.argv[3]}},
    ).then(res => res.json());

    extensions.forEach(extension => {
        if (extension['type'] == 'field') return fetch(`https://api.contentstack.io/v3/extensions/${extension['uid']}`,
            {method: 'delete', headers: {api_key: process.argv[2], authorization: process.argv[3]}}).then(res => console.log(res)).catch(err => console.log(err))
    })

    const {global_fields} = await fetch(
        'https://api.contentstack.io/v3/global_fields',
        {headers: {api_key: process.argv[2], authorization: process.argv[3]}},
    ).then(res => res.json());

    global_fields.forEach(field => fetch(`https://api.contentstack.io/v3/global_fields/${field['uid']}?force=true`,
        {method: 'delete', headers: {api_key: process.argv[2], authorization: process.argv[3]}})
    )
    return
}
deleter()

