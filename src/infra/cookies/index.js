import JsCookies from "js-cookie";


export class Cookies {
    static get(key) {
        try {
            const value = JsCookies.get(key)
            if (value) {
                return JSON.parse(value)
            }
            return;
        } catch (_error) {
            return JsCookies.get(key);
        }
    }

    static set(key, value, config) {
        const formatted = JSON.stringify(value)
        JsCookies.set(key, formatted, config)
    }

    static remove(key) {
        JsCookies.remove(key)
    }

}