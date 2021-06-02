import React from 'react'
import { Icon, List } from 'semantic-ui-react'
import { PageContainer, PageHeading } from '../../Components'
import { useGithubTimestamp, Code, CodeBlock, ExternalLink } from '../../utilities'

/*
Layout

Abstract:
- basic summary
--> what
--> why
--> how
- important links
--> github
--> documentation
--> trello

Work so far
- RNGLR parser


*/

export const DewySpeak = (): JSX.Element => {
    const subtitle = useGithubTimestamp('dewy')

    return (
        <>
            <PageContainer>
                <PageHeading title="Dewy Programming Language" subtitle={subtitle} />
                <p>
                    Dewy is a programming language I have been personally developing since 2016. The main goal is to build a language that has the exact feature
                    set that I&apos;ve always wished existed. Dewy is a general purpose language with a focus on scientific and engineering applications. At a
                    high level, Dewy is sort of like an amalgamation of the best aspects of Matlab, Python, TypeScript, and Rust, but with its own unique flare.
                </p>
                <p>
                    So far in development, I have developed the syntax for the language (and meta-language), and have built a prototype{' '}
                    <ExternalLink href="https://raw.githubusercontent.com/david-andrew/dewy/master/resources/Right_Nulled_GLR_Parsers.pdf">RNGLR</ExternalLink>{' '}
                    \{' '}
                    <ExternalLink href="https://raw.githubusercontent.com/david-andrew/dewy/master/resources/Faster_Scannerless_Parsing.pdf">
                        SRNGLR
                    </ExternalLink>{' '}
                    parser from scratch in C. The next steps are to add some missing features to the parser, write out the language Context Free Grammar (CFG)
                    in the meta-language, implement the parser back ends (LLVM and C) for generating code from the parse tree, and then build out the standard
                    library.
                </p>
                <h3>Parsing</h3>
                <p>
                    All programming languages start with a compiler, which itself is made of several parts, namely: lexing, parsing, semantic analysis, and code
                    generation. Dewy makes use of a SRNGLR parser which allows the lexing and parsing phases be combined into a single step.
                </p>
                <p>
                    To parse a mathematical expression like <Code>1 + 2 * 3</Code> we first have to define the grammar for how raw text gets converted to a
                    parse tree. For this, I&apos;ve developed the Dewy Meta Language which allows for the specification of any Context Free Grammar (CFG), as
                    well as some context sensitive grammars which can be parsed by SRNGLR
                </p>
                <p>
                    Normally a grammar must be unambiguous to work with standard LR, LALR, etc. parsers. This complicates the process of writing the grammar.
                    For the math expression <Code>1 + 2 * 3</Code>, or any other math expression, the unambiguous version of the grammar might look like this:
                </p>
                <CodeBlock
                    text={`//addition/subtraction (left associative)
#S = #S #w* '+' #w* #A | #S #w* '-' #w* #A | #A;

//multiplication/division (left associative)
#A = #A #w* '*' #w* #E | #A #w* '/' #w* #E | #E;

//exponentiation (right associative)
#E = #T #w* '^' #w* #E | #T;

//terms (numbers/identifiers/groups)
#T = #N | #I | #G;
#N = [0-9]+;
#I = [A-Za-z_] [A-Za-z0-9!@%&_?]*;
#G = '(' #w* #S #w* ')';

//whitespace
#w = [\\x20\\n];

#start = (#w* #S)+ #w*;`}
                />
                <p>However, because SRNGLR can handle ambiguities, the grammar can be simplified to something like this:</p>
                <CodeBlock
                    text={`#E = '(' #ws* #E #ws* ')';  //parenthesis
#E = #E #ws* [+\\-] #ws* #E; //addition/subtraction
#E = #E #ws* [*/] #ws* #E;  //multiplication/division
#E = #E #ws* '^' #ws* #E;   //exponentiation
#E = #N | #I;               //terms (numbers/identifiers)
#N = [0-9]+;
#I = [A-Za-z_] [A-Za-z0-9!@%&_?]*;

#ws = [\\n\\x20];             // whitespace

#start = (#ws* #E)+;`}
                />
                <p>
                    Note that for the ambiguous grammar, precedence and associativity still need to be handled at some point in the process. SRNGLR just
                    provides the flexibility to handle them more conveniently.
                </p>
                <p>
                    Running the first grammar on <Code>1 + 2 * 3</Code> we get the following parse tree
                </p>
                <CodeBlock
                    text={`#start:0
├── #__4:0
│   ├── #__5:0
│   │   ├── ϵ
│   │   └── #S:0
│   │       ├── #S:2
│   │       │   └── #A:2
│   │       │       └── #E:1
│   │       │           └── #T:0
│   │       │               └── #N:0
│   │       │                   ├── 1
│   │       │                   └── ϵ: #__2
│   │       ├── #__1:0
│   │       │   ├── #w:0
│   │       │   │   └── \\x20
│   │       │   └── ϵ: #__1
│   │       ├── +
│   │       ├── #__1:0
│   │       │   ├── #w:0
│   │       │   │   └── \\x20
│   │       │   └── ϵ: #__1
│   │       └── #A:0
│   │           ├── #A:2
│   │           │   └── #E:1
│   │           │       └── #T:0
│   │           │           └── #N:0
│   │           │               ├── 2
│   │           │               └── ϵ: #__2
│   │           ├── #__1:0
│   │           │   ├── #w:0
│   │           │   │   └── \\x20
│   │           │   └── ϵ: #__1
│   │           ├── *
│   │           ├── #__1:0
│   │           │   ├── #w:0
│   │           │   │   └── \\x20
│   │           │   └── ϵ: #__1
│   │           └── #E:1
│   │               └── #T:0
│   │                   └── #N:0
│   │                       ├── 3
│   │                       └── ϵ: #__2
│   └── ϵ: #__6
└── ϵ: #__1`}
                />
                <p>while parsing the same input with the ambiguous grammar returns the following parse forests:</p>
                <CodeBlock
                    text={` 0 #start:0
 1 ├── #__4:0
 2 │   ├── ϵ
 3 │   └── [#E:2]
 4 │       ├───┬── #E:1
 5 │       │   │   ├── #E:4
 6 │       │   │   │   └── #N:0
 7 │       │   │   │       ├── 1
 8 │       │   │   │       └── ϵ: #__2
 9 │       │   │   ├── #__1:0
10 │       │   │   │   ├── #ws:0
11 │       │   │   │   │   └── \\x20
12 │       │   │   │   └── ϵ: #__1
13 │       │   │   ├── +
14 │       │   │   ├── #__1:0
15 │       │   │   │   ├── #ws:0
16 │       │   │   │   │   └── \\x20
17 │       │   │   │   └── ϵ: #__1
18 │       │   │   └── #E:4
19 │       │   │       └── #N:0
20 │       │   │           ├── 2
21 │       │   │           └── ϵ: #__2
22 │       │   ├── #__1:0
23 │       │   │   ├── #ws:0
24 │       │   │   │   └── \\x20
25 │       │   │   └── ϵ: #__1
26 │       │   ├── *
27 │       │   ├── #__1:0
28 │       │   │   ├── #ws:0
29 │       │   │   │   └── \\x20
30 │       │   │   └── ϵ: #__1
31 │       │   └── #E:4
32 │       │       └── #N:0
33 │       │           ├── 3
34 │       │           └── ϵ: #__2
35 │       └───┬── @5
36 │           ├── @9
37 │           ├── +
38 │           ├── @14
39 │           └── #E:2
40 │               ├── @18
41 │               ├── @22
42 │               ├── *
43 │               ├── @27
44 │               └── @31
45 └── ϵ: #__5`}
                />
                <p>
                    Notice the ambiguity nodes on for <Code>#E</Code> on lines 4 and 35, representing the two options for parsing the expression, namely{' '}
                    <Code>(1 + 2) * 3</Code> vs <Code>1 + (2 * 3)</Code> respectively
                </p>
                <h3>Semantic Analysis &amp; Code Generation</h3>
                <p>
                    The next steps involve implementing the semantic analysis, and code generation pieces of the compiler. With a suitable CFG specification for
                    the language, the SRNGLR parser will output parse trees for given input source text. The parse trees need to be analyzed to ensure that they
                    follow the languages semantics, e.g. variables may only be referenced when in scope, function calls have the same number of arguments as
                    their definitions, type safety checks, etc.
                </p>
                <p>
                    After semantic analysis, the last step of the compiler is code generation. For dewy, I plan to leverage the LLVM compiler toolchain, meaning
                    I convert the parse tree into the LLVM Intermediate Representation (i.e. assembly language), which is then optimized and compiled down to a
                    binary executable. I&apos;m also thinking of having a C code generator, which would allow for extreme levels of portability in the
                    compiler&mdash;most systems could build and run the Dewy compiler, as a C99 compiler would be the only dependency.
                </p>
                <h3>Try It</h3>
                <p>
                    Since the language is far from complete, the most you can try is the SRNGLR parser. The git repo includes several example grammar and source
                    code pairs that can be run by the current parser.
                </p>
                <CodeBlock
                    language="bash"
                    text={`$ git clone git@github.com:david-andrew/dewy.git
$ cd dewy/src/compiler
$ make dewy #alternatively \`make debug\`
$ ./dewy path/to/grammar/file path/to/source/file`}
                />
                <p>
                    The project includes several test grammar/source file pairs in the tests/ directory. e.g. the simple expression grammar from above could be
                    run like so:
                </p>
                <CodeBlock
                    language="bash"
                    text={`$ ./dewy ../../tests/grammar8.dewy ../../tests/source8.dewy #ambiguous version
$ ./dewy ../../tests/grammar3.dewy ../../tests/source8.dewy #unambiguous version`}
                />
                <h3>Links</h3>
                <List>
                    <List.Item>
                        <span>
                            <Icon name="github" size="big" />
                            <ExternalLink href="https://github.com/david-andrew/dewy">github repo</ExternalLink>
                        </span>
                    </List.Item>
                    <List.Item>
                        <span>
                            <Icon name="trello" size="big" />
                            <ExternalLink href="https://trello.com/b/YYsedENy/dewyspeak">project trello board</ExternalLink>
                        </span>
                    </List.Item>
                    <List.Item>
                        <span>
                            <Icon name="file alternate" size="big" />
                            <ExternalLink href="https://david-andrew.github.io/dewy/">Language Documentation</ExternalLink>
                        </span>
                    </List.Item>
                </List>
            </PageContainer>
        </>
    )
}
