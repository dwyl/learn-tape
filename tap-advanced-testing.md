# _Why_ Use `Tap`?

In _most_ situations **`Tape`** will be _exactly_ what you need
to write and run your Node.js/JavaScript tests. <br />
**`Tape`** is minimalist, fast and has flexibility when you need it.
_Occasionally_ however, the needs of the project
require a few extra features from the testing framework.

If you find yourself (_your project_) needing to do "setup"
**`before`** running a test or "teardown" **`after`** the test is complete
(_e.g. resetting a mock or the state of a front-end app_),
***OR*** you have a few hundred/thousand tests which are taking a "long time"
to run (_e.g: more than 10 seconds_),
then you will benefit form switching to **`Tap`**.


































<br />

## Analogy: _Single_ Speed vs. _Geared_ Bicycle


<div align="center">
    <a href="https://user-images.githubusercontent.com/194400/46041154-102cb800-c10a-11e8-8646-153a77b53408.jpg"> <!-- link to larger version of image -->
        <img width="700px" src="https://user-images.githubusercontent.com/194400/47200839-8a4e0680-d36f-11e8-9419-96e8c0ca968e.jpg"
        alt="single speed bicycle - perfect for short trips on fairly flat ground">
    </a>
</div>
<br />

**`Tape`** is like a **single speed** bicycle;
lightweight, fewer "moving parts", less to learn and _fast_! <br />
_Perfect_ for **_short_ trips** on _relatively_ **_flat_ terrain**.
_Most_ journeys in cities fit this description.
_Most_ of the time you won't _need_ anything more than this
for commuting from home to work, going to the shops, etc.


<div align="center">
    <a href="https://user-images.githubusercontent.com/194400/46041153-102cb800-c10a-11e8-9c51-3c16eb81db4c.jpg"> <!-- link to larger version of image -->
        <img width="700px" src="https://user-images.githubusercontent.com/194400/47200840-8a4e0680-d36f-11e8-8634-2fcf80eedee5.jpg"
        alt="geared bicycle bicycle - for longer distances and hilly terrain">
    </a>
</div>
<br />

**`Tap`** is the bicycle _with **gears**_
that allows you to tackle different _terrain_.
"Gears" in the context of writing unit/end-to-end tests
is having a `t.spawn` (_run tests in a separate process_),
or running tests in parallel so they finish faster;
i.e. reducing the _effort_ required to cover the same distance
and in some cases speeding up the execution of your test suite.



> <small> **Note**: This analogy falls down if your commuting distance is far;
you need a geared bicycle for the long stretches!
Also, if you _never_ ride a bicycle - for whatever reason -
and don't appreciate the difference between
single speed and geared bikes this analogy might feel less relevant ...
in which case we recommend a bit of background reading:
https://bicycles.stackexchange.com/questions/1983/why-ride-a-single-speed-bike
</small>

# _Why_ NOT Use `Tap` _Everywhere_?

One of the _benefits_ of Free/Open Source software
is that there is near-zero
["switching cost"](https://en.wikipedia.org/wiki/Switching_barriers).
Since we aren't paying for the code,
the only "cost" to adopting a new tool is **_learning_ time**.

Given that **`Tap`** is a "drop-in replacement" for **`Tape`**
in _most_ cases, the switching cost is just **`npm install tap --save-dev`**
followed by a find-and-replace across the files in your project from:
**`require('tape')`** to **`require('tap')`**.

Over the last 5 years @dwyl we have tested **200+** projects using **`Tape`**
(_both Open Source and Client projects_).
We have no reason for "_complaint_" or criticism of **`Tape`**,
we will _not_ be spending time switching
our _existing_ projects from **`Tape`** to **`Tap`**
because in most cases, there is **no _need_**;
[YAGNI!](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)

Where we _are_ using **`Tap`** is for the _massive_ projects
where we either need to do a lot of state re-setting e.g: **`t.afterEach`**
or simply where test runs take longer than 10 seconds
(_because we have lots of end-to-end tests_)
and running them in ***parallel*** significantly reduces waiting time.

For an _extended_ practical example of where writing tests with **`Tap`**
instead of **`Tape`** was worth the switch,
see:
