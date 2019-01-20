#!/usr/bin/env node

module.exports = function (context) {


    var fs = context.requireCordovaModule('fs');
    var path = context.requireCordovaModule('path');
    let xml2js = require('xml2js');


    var platformRoot = path.join(context.opts.projectRoot, 'platforms/android/app/src/main');

    console.log("-*****************************************************-");
    console.log(platformRoot);

    console.log("-------------------------------------");
    var manifestFile = path.join(platformRoot, 'AndroidManifest.xml');

    if (fs.existsSync(manifestFile)) {
        fs.readFile(manifestFile, 'utf8', function (err, data) {

            console.log("manifest exist---- * we make some update*--------------");
            if (err) {
                console.error('Unable to find AndroidManifest.xml: ' + err);
                return;
            }
            let parser = new xml2js.Parser()
            parser.parseString(data, function (parseError, xmlReadResult) {

                let activity = xmlReadResult.manifest.application[0].activity;

                if (activity !== undefined) {
                    let intensts = activity[0]['intent-filter'];

                    let addIntent = true;
                    if (intensts !== undefined) {
                        intensts.forEach(element => {

                            if (element.hasOwnProperty("data")) {
                                const host = element.data[0].$['android:host'];
                                const scheme = element.data[0].$['android:scheme'];

                                if (scheme == "https" && host == "tricypolitain.com") {
                                    console.log('already exist');
                                    addIntent = false;
                                }
                            }
                        });
                    }

                    if (addIntent) {


                        console.log('.................................we put new node ');
                        let node = {


                            action: {
                                $: {
                                    "android:name": "android.intent.action.VIEW"
                                }
                            },
                            category__: {
                                $: {
                                    "android:name": "android.intent.category.DEFAULT"
                                }
                            },
                            category: {
                                $: {
                                    "android:name": "android.intent.category.BROWSABLE"
                                }
                            },
                            data: {
                                $: {
                                    "android:host": "tricypolitain.com",
                                    "android:scheme": "https"
                                }
                            },



                        };



                        if (activity[0]['intent-filter'] !== undefined) {
                            activity[0]['intent-filter'][777] = node
                        }
                        else {
                            activity[0]['intent-filter'] = node
                        }
                        console.log('.................................we put new node ');
                        console.log(activity);
                    }

                } else {
                    console.log("activiity tag not exist !!! ")
                }
                var xbuilder = new xml2js.Builder();
                var xml = xbuilder.buildObject(xmlReadResult);

                xml = xml.replace("category__", 'category');

                fs.writeFile(manifestFile, xml, 'utf8', function (err) {
                    console.log(err)

                    console.log("udpated");
                })

            });

        })
    }
}

