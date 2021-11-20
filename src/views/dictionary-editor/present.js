export default function present(treemap) {
    let content = ""
    for (let [k,v] of treemap) {
        if (k === "") continue
        content += `${v.name} - ${v.description}\n`
        if (v.subDefinitions.length > 0) {
            content += v.subDefinitions.join("\n") + "\n"
        }
        content += "\n"
    }

    return content
}