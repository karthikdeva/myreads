export const ShelveOptions = [
    {
        value: "none",
        label: "none",
        selected: true
    }, {
        value: "currentlyReading",
        label: "Currently Reading",
        selected: false
    }, {
        value: "wantToRead",
        label: "Want to Read",
        selected: false
    }, {
        value: "read",
        label: "Read",
        selected: false
    }
]

export const camelCaseToSentanceCase = (stringValue) => {
    if (!stringValue) 
        return;
    return stringValue
        .replace(/([A-Z][a-z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
}