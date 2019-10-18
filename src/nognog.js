var Nognog = (function (window, document) {
    'use strict';
    var init = function(config) {
        if (!config.podUrl) {
            console.error('Missing podUrl');
            return;
        }
        if (!config.vendorUrl) {
            console.error('Missing vendorUrl');
            return;
        }
        if (!config.vendorId) {
            console.error('Missing vendorId');
            return;
        }
        if (!config.adminPKI) {
            console.error('Missing adminPKI');
            return;
        }
        if (!config.userPKI) {
            console.error('Missing userPKI');
            return;
        }
        this.config = config;
    },
    includeLibs = function() {
        includeAxios();
        includeFingerprint();
        includeJsrsasign();
    },
    includeAxios = function() {
        var js,
            fjs = document.getElementsByTagName('script')[0];
        if (!document.getElementById('axios-script')) {
            js = document.createElement('script');
            js.id = 'axios-script';
            // js.setAttribute('defer', '');
            js.src = '//cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js';
            fjs.parentNode.insertBefore(js, fjs);
        }
    },
    includeJsrsasign = function() {
        var js,
            fjs = document.getElementsByTagName('script')[0];
        if (!document.getElementById('jsrsasign-script')) {
            js = document.createElement('script');
            js.id = 'jsrsasign-script';
            // js.setAttribute('defer', '');
            js.src = '//kjur.github.io/jsrsasign/jsrsasign-all-min.js';
            fjs.parentNode.insertBefore(js, fjs);
        }
    },
    includeFingerprint = function() {
        var js,
            fjs = document.getElementsByTagName('script')[0];
        if (!document.getElementById('fg-script')) {
            js = document.createElement('script');
            js.id = 'fg-script';
            // js.setAttribute('defer', '');
            js.src = '//cdn.jsdelivr.net/npm/fingerprintjs2@2.1.0/dist/fingerprint2.min.js';
            fjs.parentNode.insertBefore(js, fjs);
        }
    },
    getFingerprint = async function() {
        return new Promise(((resolve, reject) => {
            if (!Fingerprint2) {
                console.error('Could not found fingerprintjs2');
                reject(null);
            }
            var components = Fingerprint2.get(function(components) {
                if (components && components.length) {
                    var values = components.map(function (component) { return component.value });
                    var murmur = Fingerprint2.x64hash128(values.join(''), 31);
                    resolve(murmur);
                } else {
                    reject(null);
                }
            });
        }));
    },
    getUserJWTToken = function() {
        if (!KJUR) {
            console.error('Could not found KJUR jsrsasign');
            return null;
        }
        var header = {alg: 'RS256', typ: 'JWT'},
            payload = {
                iss: this.config.vendorId,
                admin: false,
                exp: KJUR.jws.IntDate.get('now + 1hour')
            };
        var sHeader = JSON.stringify(header),
            sPayload = JSON.stringify(payload);
        return KJUR.jws.JWS.sign('RS256', sHeader, sPayload, this.config.userPKI.priv);
    },
    getAdminJWTToken = function() {
        if (!KJUR) {
            console.error('Could not found KJUR jsrsasign');
            return null;
        }
        var header = {alg: 'RS256', typ: 'JWT'},
            payload = {
                iss: this.config.vendorId,
                admin: true,
                exp: KJUR.jws.IntDate.get('now + 1hour')
            };
        var sHeader = JSON.stringify(header),
            sPayload = JSON.stringify(payload);
        return KJUR.jws.JWS.sign('RS256', sHeader, sPayload, this.config.adminPKI.priv);
    },
    podConnect = async function(signatures) {
        if (!axios) {
            console.error('Could not found axios');
            return null;
        }

        var userToken = this.getUserJWTToken(),
            fingerprint = await getFingerprint();

        var response = await axios.post(this.config.podUrl + '/pods/connect', {
            signatures: { fingerprint, ...signatures }
        }, {
            headers: { Authorization: `Bearer ${userToken}` }
        }).catch(function(error) {
            console.log(error);
        });

        if (response.status === 200 && response.data && response.data.vendorAccessToken) {
            return response.data.vendorAccessToken;
        }

        return null;
    },
    /*
    activityData = {
        "scope":"sites.history",
        "action": {
            "actionPredicate":"article1",
            "actionObject":"front_676"

        },
        "timestamp":1569983632000
    }
    */
    feedPodActivity = async function(accessToken, activityData) {
        if (!axios) {
            console.error('Could not found axios');
            return false;
        }

        var response = await axios.post(this.config.podUrl + '/pods/activities', activityData, {
            headers: { Authorization: `Bearer ${accessToken}` }
        }).catch(function(error) {
            console.log(error);
        });

        return response && response.status === 200;
    },
    /*
    recommendData = {
        "recommendationType":"similar",
        "searchQuery":"certification and standards development",
        "currentViewItemId":"article_190790",
        "contentViewerGrp":"exco",
        "top-k": 10,
        "requestContentType": ["article","event"]
    }
    */
    getRecommendations = async function(accessToken, recommendData) {
        if (!axios) {
            console.error('Could not found axios');
            return false;
        }

        var response = await axios.post(this.config.podUrl + '/recommendations', recommendData, {
            headers: { Authorization: `Bearer ${accessToken}` }
        }).catch(function(error) {
            console.log(error);
        });

        response.status = 200;
        return response.data;
    },
    /*
    feedbackData = {
        "scope":"user.feedback",
        "action": {
            "actionPredicate":"why",
            "actionObject":"front_676"

        },
        "timestamp":1569983632000
    }
    */
    feedbackRecommendation = async function(accessToken, feedbackData) {
        if (!axios) {
            console.error('Could not found axios');
            return false;
        }

        var response = await axios.post(this.config.podUrl + '/pods/activities', feedbackData, {
            headers: { Authorization: `Bearer ${accessToken}` }
        }).catch(function(error) {
            console.log(error);
        });

        return response && response.status === 200;
    },
    /*
    content = {
		"itemId":"123",
		"contentUserAccessGroup":"exco",
		"webSlug":"lorem-ipsum",
		"tags":"some tags",
		"status":"ACTIVATED",
		"publishedDate":"2019/07/19",
		"deletedAt":"timestamp",
		"createdAt":"timestamp",
		"updatedAt":"timestamp",
		"excerpt": "Lorem ipsum dolor sit amet",
		"imageUri":"https://www.scsglobalservices.com/files/buy_clean_banner2.jpg",
		"title":"Lorem ipsum",
		"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
    */
    uploadIncrementalContent = async function(content) {
        if (!axios) {
            console.error('Could not found axios');
            return false;
        }

        var adminToken = this.getAdminJWTToken();
        var response = await axios.post(this.config.vendorUrl + '/batches', content, {
            headers: { Authorization: `Bearer ${adminToken}` }
        }).catch(function(error) {
            console.log(error);
        });

        console.log(response);

        return response && response.status === 200;
    };
    // includeLibs();
    return {
        config: null,
        init,
        podConnect,
        getUserJWTToken,
        getAdminJWTToken,
        feedPodActivity,
        getRecommendations,
        feedbackRecommendation,
        uploadIncrementalContent,
    };
})(window, document);
