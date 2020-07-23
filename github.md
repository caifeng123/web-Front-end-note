## github的指令

### 1、提交到当前版本上

```shell
git commit
```

### 2、创建分支，并切换

```shell
git branch <分支名>			//创建分支
git checkout <分支名>		//切换分支
或者	
git checkout -b <分支名>
```

### 3、merge合并分支

<img style="height:400px" src="C:\Users\59474\AppData\Roaming\Typora\typora-user-images/1.png"  alt="真棒" /><img style="height:400px" src="C:\Users\59474\AppData\Roaming\Typora\typora-user-images/2.png"  alt="真棒" />

<img style="height:400px" src="C:\Users\59474\AppData\Roaming\Typora\typora-user-images/3.png"  alt="真棒" /><img style="height:400px" src="C:\Users\59474\AppData\Roaming\Typora\typora-user-images/4.png"  alt="真棒" />

```shell
git merge bugFix //确保当前处于master 合并另一分支
git checkout bugFix //切换到另一分支
git merge master	//再次合并
```

### 4、rebase 合并线性分支

> 将分支线性更新到最新分支上

![image-20200617163332598](C:\Users\59474\AppData\Roaming\Typora\typora-user-images\image-20200617163332598.png)

```shell
//当前处于bugFix，将其放到master下
git rebase master
```

### 5、观察head指针

![image-20200617164112816](C:\Users\59474\AppData\Roaming\Typora\typora-user-images\image-20200617164112816.png)

> 此时HEAD -> master -> C1
>
> HEAD 指向 master， master 指向 C1

```shell
git checkout c1
```

>现在变成了
>
>HEAD -> C1

