import {TreeMap} from "jstreemap";
import Definition from "../model/definition";

export default class Parser {

    parseText(text) {
        const ts = new TreeMap()
        const und = new Definition("Undefined")
        let def = und

        text.split("\n").forEach(line => {
            if (line.startsWith("-")){
                def.subDefinitions.push(line)
            } else {
                ts.set(def.name, def)
                def = Definition.of(line)
            }
        })

        if (!ts.has(def.name)) {
            ts.set(def.name, def)
        }

        if (und.subDefinitions.length === 0) {
            ts.delete(und.name)
        }

        return ts
    }
}