
/**
 * ACTASF Fleet Builder - render.js
 *
 * A class to render HTML from templates stored in template tags
 * It is sent a template and a JSON object and it returns HTML
 * 
 * @author Zac Belado tabletopgametools@gmail.com
 * @property {DOM} currentTemplate - a DOM reference to the template being used
 * @property {JSON} currentDataObject - the JSON object or array being used as a data source
 * @property {array} keys - the keys from the object that we need to render
 * @property {array} replacements - the RegExp objects we are using to replace the keys
 * 
 */
 
export default class render {
    
    constructor () {
        
        this.currentTemplate = null;
        this.currentDataObject = null;
        this.keys = null;
        this.replacements = null;
                
    }
    
    /**
     * render an object and return the HTML for it
     *
     * @param {object} renderObj - the object we need to render
     * @returns {string} - the rendered HTML for the object
     */
    renderObject(renderObj) {
        
        // get the innerHTML from the template
        let templateHTML = this.currentTemplate.innerHTML;
        let limit = this.keys.length;
        
        // iterate over each replacement and its value
        for (var i = 0; i <= limit; i++) {
            templateHTML = templateHTML.replace(this.replacements[i], renderObj[this.keys[i]]);
        }
        
        return templateHTML;

    }
    
    /**
     * @function renderArray
     * 
     * iterate over the data array and render each object in it
     * @returns {string} - the rendered HTML for the array
     */
    renderArray() {

        let HTMLreturn = "";

        // itereate over each item in the data object
        this.currentDataObject.forEach (anElement => {
            
            // render the object
            HTMLreturn += this.renderObject(anElement);
            
        });
        
        return HTMLreturn;
        
    }
    
    /**
     * Take the template and the data and create HTML to return
     *
     * @param {DOM} template - a DOM reference to the template being used
     * @param {JSON} data - the JSON object or array being used as a data source
     */
    renderHTML (template, data) {

        // store the params being sent in case we need to use them again
        this.currentTemplate = template;
        this.currentDataObject = data;

        // test to see if data is an array or an object
        // and the store the appropriate keys and replacements
        if (Array.isArray(data)) {

            // we were given an array so we need to get the keys from the first item
            this.keys = Object.keys(data[0]);
            this.replacements = this.keys.map((aKey) => { return new RegExp(`{{${aKey}}}`, 'g') });
            
            // then render an array
            return this.renderArray();
            
        } else {

            // we were given an object so we need to get the keys from it directly
            this.keys = Object.keys(data);
            this.replacements = this.keys.map((aKey) => { return new RegExp(`{{${aKey}}}`, 'g') });
            
            // then render an object
            return this.renderObject(data);
            
        }

    }
    
}