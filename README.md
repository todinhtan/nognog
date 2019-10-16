### Quickstart
POD operations
```js
var vendorAccessToken = await Nognog.podConnect("hieutran@noggin.asia");
var activity = {
    "scope":"sites.history",
    "action": {
        "actionPredicate":"article1",
        "actionObject":"front_676"
        
    },
    "timestamp":1569983632000
}
var feedActResult = await Nognog.podConnect(vendorAccessToken, activity);

var getRecPayload = {
                    	"recommendationType":"similar",
                    	"searchQuery":"certification and standards development",
                    	"currentViewItemId":"article_190790",
                    	"contentViewerGrp":"exco",
                    	"top-k": 10,
                    	"requestContentType": ["article","event"]
                    }
var getRecResult = await Nognog.getRecommendations(vendorAccessToken, getRecPayload);

var feedback = {
               	"scope":"sites.history",
               	"action": {
               		"actionPredicate":"article1",
               		"actionObject":"front_676"
               		
               	},
               	"timestamp":1569983632000
               }
var feedActivitiesResult = await Nognog.feedbackRecommendation(vendorAccessToken, feedback)

var activity = {
               	"scope":"sites.history",
               	"action": {
               		"actionPredicate":"why",
               		"actionObject":"front_676"
               		
               	},
               	"timestamp":1569983632000
               }
var feedActivitiesResult = await Nognog.feedPodActivity(vendorAccessToken, activity)
```

Incremental content uploading
```js
var contents = {
               	"payloads": [{
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
               	}],
               	"eventType":"article"
               }

var result = Nognog.uploadIncrementalContent(contents)
```
