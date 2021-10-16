##### Jumpserver installation instructions
+ It is recommended to use the newly installed `jumpserver 1.5.6` version
+ Refer to official instructions for installation documentation https://jumpserver.readthedocs.io/zh/master/step_by_step.html
+ My test jumpserver does not support Mysql8.0, it is recommended to use Mysql5.6/5.7

##### Jumpserver configuration instructions
+ `Asset Management`-Configure management user (root) in `Manage User`
+ `Asset Management`-Configure system users in `System User` (the account used to log in to the server)
+ Do not delete the root node (Default)

##### Opscloud automated configuration
+ New servers in oc will automatically create jumpserver assets
+ Both assets and asset groups are mapped synchronously
+ The user authorized the server group will automatically synchronize the user to the jumpserver and map the asset authorization
+ The user saves the pubkey in the oc personal details and it will be automatically synchronized to the jumpserver

##### Usage issues
+ The name of koko is incorrect (please modify the value of the name field in the terminal table), and the registered name of koko is incorrect.